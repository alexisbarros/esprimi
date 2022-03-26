import {
    DialogInterface
} from "../../../../../interfaces/dialog";
import {
    MainInterface
} from "../../../../../interfaces/main";
import {
    TableElementInterface
} from "../../../../../interfaces/table";
import {
    TextTransformation
} from "../../../../../utils/text.transformation";

export class CodeToAngularTableComponentMethod {
    static customMethod = (object: MainInterface): string => {
        let hasAction = '', refreshToken = '';

        if (!object.table)
            return '';

        if (object.table.service?.hasAuthorization) {
            refreshToken = `refreshToken = () => {
                this._${object.table.id}Service.refreshToken()
                    .then(async (res: any) => {
                        await sessionStorage.setItem('refreshToken', res?.data.authRefreshToken);
                        await sessionStorage.setItem('token', res?.data.authToken);
                    })
                    .catch(err => {
                        const message = this._errorHandler.apiErrorMessage(err.error.message);
                        this.isLoading = false;
                        this.sendErrorMessage(message);
                        sessionStorage.clear();
                        this.router.navigate(['/']);
                    })
            }`
        }

        if (object.table.actions)
            hasAction = `
            ${object.table.id}Submit() {
                this.isLoading = true;
                this._${object.table.id}Service
                .find(this.${object.table.id}Form.value)
                .then((res) => {
                    this.isLoading = false;
                })
                .catch((err) => {
                    const message = this._errorHandler.apiErrorMessage(err.error.message);
                                        
                    this.isLoading = false;

                    this.sendErrorMessage(message);
                })
            }
            `;
        const componentCode = `
                            ${CodeToAngularTableComponentMethod.setTableElements(object.table.elements)}
                            ${hasAction}
                            set${TextTransformation.pascalfy(object.table.id)}Service = () => {
                                this._${object.table.id}Service.getAll()
                                .then((result: any) => {
                                  this.${object.table.id}DataSource = result?.data.result ? result?.data.result : result?.data;
                                  this.isLoading = false;
                                })
                                .catch(async err => {
                                  if (err.error.logMessage === 'jwt expired') {
                                    await this.refreshToken();
                                    this.set${TextTransformation.pascalfy(object.table.id)}Service();
                                  } else {
                                    const message = this._errorHandler.apiErrorMessage(err.error.message);
                                    this.isLoading = false;
                                    this.sendErrorMessage(message);
                                  }
                                })
                            }
                            ${refreshToken}
                            `;

        return componentCode;
    }

    static setTableElements(elements: Array < TableElementInterface > ): string {
        let codeElement = '';
        elements.forEach(object => {
            if (object.row) {
                const menus = object.row.menu;

                menus?.forEach(menu => {
                    if (menu.dialog) {
                        codeElement += CodeToAngularTableComponentMethod.setDialog(menu.dialog);
                    }
                });
            }
        });

        return codeElement;
    }

    static setDialog(dialog: DialogInterface): string {
        let hasDialogData = '';

        if (dialog.dialogDataInterface) {
            hasDialogData += `,data:
                                ${JSON.stringify(
                                    dialog.dialogDataInterface,
                                )}`;
        }

        const codeDialog = `
                    ${hasDialogData}
                    ${dialog.id}OpenDialog = () => {
                        const ${dialog.id}DialogRef = this._dialog.open(
                            ${TextTransformation.pascalfy(dialog.id)}Component,{}
                        )
                    };`;

        return codeDialog;
    }
}