import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

export class CodeToAngularModuleImport {
  static customImports = (object: MainInterface): string => {
    if (object.module) {
      const imports = CodeToAngularModuleImport.createModuleImports(object);

      const componentCode = `
      ${imports}
      `;

      return componentCode;
    }

    return "";
  };

  static createModuleImports = (object: MainInterface) => {
    let imports = "";
    let hasChart = false;
    
    if (object.module) {
      const components = object.module.components;

      for (let index = 0; index < components.length; index++) {
        const component = components[index];
        const componentKebabfied = TextTransformation.kebabfy(component);

        if (componentKebabfied.split('-').pop() === "chart") {
          hasChart = true;
        }

        imports += `import { %pascalfy(${component})%Component } from 'src/app/components/%kebabfy(${component})%/%kebabfy(${component})%.component';`;

      }
    }

    if (hasChart) {
      imports += `import { NgChartsModule } from "ng2-charts";`;
    }

    return imports;
  };
}
