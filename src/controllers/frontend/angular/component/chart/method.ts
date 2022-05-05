import { ChartInterface } from "../../../../../interfaces/chart";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";

export class CodeToAngularChartComponentMethod {
  static customMethod = (object: MainInterface): string => {
    if (!object.chart) return "";

    const chart = object.chart;
    const methods = CodeToAngularChartComponentMethod.createChartMethods(chart);            
    const componentCode = `${methods}`;
                              
    return componentCode;
  };

  static createChartMethods = (chart: ChartInterface): string => {
    let methods = "";

    if (chart.line) {
      methods += `
      ${chart.id}LineChartClicked({
        event,
        active,
      }: {
        event?: ChartEvent;
        active?: {}[];
      }): void {
        console.log(event, active);
      };

      ${chart.id}LineChartHovered({
        event,
        active,
      }: {
        event?: ChartEvent;
        active?: {}[];
      }): void {
        console.log(event, active);
      };

      set${TextTransformation.pascalfy(chart.id)}Service = (filter: string = '') => {
        this._${chart.id}Service.getAll(filter)
        .then((result: any) => {
          this.${chart.id}DataSource = result?.data.result ? result?.data.result : result?.data;
          this.isLoading = false;
        })
        .catch(async err => {
          if (err.error.logMessage === 'jwt expired') {
            await this.refreshToken();
            this.set${TextTransformation.pascalfy(chart.id)}Service();
          } else {
            const message = this._errorHandler.apiErrorMessage(err.error.message);
            this.isLoading = false;
            this.sendErrorMessage(message);
          };
        });
      };

      refreshToken = async () => {
        try {
            const res: any = await this._${chart.id}Service.refreshToken();

            if (res) {
                sessionStorage.setItem('token', res?.data.authToken);
                sessionStorage.setItem('refreshToken', res?.data.authRefreshToken);
            }
        } catch (error: any) {
            const message = this._errorHandler
                                .apiErrorMessage(error.error.message);
            this.isLoading = false;
            this.sendErrorMessage(message);
            sessionStorage.clear();
            this.router.navigate(['/']);
        };
      };
      `;
    }

    return methods;
  }
};