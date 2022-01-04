import { CheckboxInterface } from "../../../../../interfaces/form";

export class CodeToAngularFormTemplateCheckbox {
    static createCheckbox(checkbox: CheckboxInterface): string {
        const required = checkbox.isRequired?'required' : '';
        
        const codeCheckbox = `<section class="checkbox-section" *ngFor="let ${checkbox.name}Item of ${checkbox.name}CheckboxObject">
                                <mat-checkbox value="${checkbox.name}Item.value">${checkbox.name}Item.label</mat-checkbox>
                            </section>`;

        return codeCheckbox;
    }
}