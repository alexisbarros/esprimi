import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const INPUT: MainInterface = {
    frontendFramework: FrontendFrameworkEnum.Angular,
    module: {
        id:'example',
        title: 'Exemplos',
        components: ['exampleForm', 'exampleTable'],
    }
}