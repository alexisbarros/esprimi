import * as fs from 'fs';
import * as chp from 'child_process';
import { ComponentCodeTypeEnum } from '../../../enums/architecture';
import { MainInterface } from '../../../interfaces/main';
import { TextTransformation } from '../../../utils/text.transformation';
import { AngularArchitectureCode } from './code';

export class AngularArchitectureComponent {
    static createArchitectureComponent = async (
        componentCode: string | undefined,
        object: MainInterface
    ) => {
        let componentPath = '';
                
        if (object.form) componentPath = TextTransformation.kebabfy(object.form.id);
        if (object.table) componentPath = TextTransformation.kebabfy(object.table.id);
        if (object.module) componentPath = TextTransformation.kebabfy(object.module.id);
        
        const projectPath = object.projectPath;
        const projectAndComponentPath = `${projectPath}/src/app/components/${componentPath}`;
        const projectFolder = projectPath.split(/[\/]+/).pop();
           
        try {
            console.info(`Pasta de componente existente.`);
            fs.readdirSync(projectAndComponentPath);
            await AngularArchitectureCode.writeCodeToFile(projectPath, componentPath, componentCode, ComponentCodeTypeEnum.Controller);
        } catch (error) {
            console.info(`Pasta de componente inexistente.`);
            try {
                chp.execSync(
                    `ng g c ${componentPath}`, 
                    {cwd: projectFolder}
                );
                await AngularArchitectureCode.writeCodeToFile(projectPath, componentPath, componentCode, ComponentCodeTypeEnum.Controller);
            } catch (error) {
                await AngularArchitectureCode.writeCodeToFile(projectPath, componentPath, componentCode, ComponentCodeTypeEnum.Controller);
            }
        }        
    }
}