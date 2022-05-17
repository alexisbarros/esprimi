import {
    MainInterface
} from "../../../../../interfaces/main";
import { ChartInterface } from "../../../../../interfaces/chart";
import { CodeToAngularChartTemplateBar } from "./bar";
import { CodeToAngularChartTemplateLine } from "./line";
import { CodeToAngularChartTemplateBubble } from "./bubble";
import { CodeToAngularChartTemplateDoughnut } from "./doughnut";
import { CodeToAngularChartTemplatePie } from "./pie";
import { CodeToAngularChartTemplatePolarArea } from "./polar-area";
import { CodeToAngularChartTemplateRadar } from "./radar";
import { CodeToAngularChartTemplateScatter } from "./scatter";

export class CodeToAngularChartTemplate {
    createChartSkeleton(object: MainInterface): string {
        if (!object.chart) return '';
        const hasFormTitle = (object.chart.title) ?
            `<mat-card-title>${object.chart.title}</mat-card-title>` :
            '';

        const hasFormSubtitle = (object.chart.subtitle) ?
            `<mat-card-subtitle>${object.chart.subtitle}</mat-card-subtitle>` :
            '';
        const chartTemplate = `
        <mat-card>
            <mat-card-header>
                ${hasFormTitle}
                ${hasFormSubtitle}
            </mat-card-header>

            <mat-card-content>
                <div *ngIf="isLoading" class="loading">
                    <mat-progress-bar color="primary" mode="buffer">
                    </mat-progress-bar>
                </div>
                ${this.createChartComponents(object, object.chart)}
            </mat-card-content>
        </mat-card>
        `;

        return chartTemplate;
    }

    private createChartComponents = (object: MainInterface, chart: ChartInterface): string => {
        let code = '';

        if (chart.bar) code += CodeToAngularChartTemplateBar.createBar(object, chart);
        if (chart.bubble) code += CodeToAngularChartTemplateBubble.createBubble(object, chart);
        if (chart.doughnut) code += CodeToAngularChartTemplateDoughnut.createDoughnut(object, chart);
        if (chart.line) code += CodeToAngularChartTemplateLine.createLine(object, chart);
        if (chart.pie) code += CodeToAngularChartTemplatePie.createPie(object, chart);
        if (chart.polarArea) code += CodeToAngularChartTemplatePolarArea.createPolarArea(object, chart);
        if (chart.radar) code += CodeToAngularChartTemplateRadar.createRadar(object, chart);
        if (chart.scatter) code += CodeToAngularChartTemplateScatter.createScatter(object, chart);

        return code;
    }
}