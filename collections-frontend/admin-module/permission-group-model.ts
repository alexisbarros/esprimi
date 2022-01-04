import { FrontendFrameworkEnum } from "../../src/enums/main";
import { MainInterface } from "../../src/interfaces/main";

export const PERMISSION_GROUP_MODEL: MainInterface = {
    frontendFramework: FrontendFrameworkEnum.Angular,
    module: {
        id:'permissionGroupModel',
        title: 'Modelos de grupos de permissões',
        components: ['permissionGroupModelForm', 'permissionGroupModelTable'],
    }
}