import { FormButtonTypeEnum, FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const MODULE_FORM: MainInterface = {
    frontendFramework: FrontendFrameworkEnum.Angular,
    backendFramework: BackendFrameworkEnum.Loopback,
    form: {
        title: 'Módulo',
        id: 'moduleForm',
        elements: [
            {
                input: {
                    label: 'Identidade',
                    name: 'id',
                    placeholder: 'Ex.: exampleModule',
                    type: FormInputTypeEnum.Text,
                    isRequired: true,
                },
            },
            {
                input: {
                    label: 'Legenda de menu',
                    name: 'title',
                    placeholder: 'Ex.: Examples',
                    type: FormInputTypeEnum.Text,
                    isRequired: true,
                },
            },
            {
                select: {
                    label: 'Componentes',
                    name: 'componentId',
                    type: FormInputTypeEnum.Text,
                    optionsApi: {
                        endpoint: 'components',
                        labelField: 'title',
                        valueField: 'id'
                    },
                    isMultiple: true
                }
            }
        ],
        actions: [{
            button: {
                label: 'Criar',
                type: FormButtonTypeEnum.Submit,
                icon: 'save',
            },
        }, ],
        service: {
            hasAuthorization: true,
            baseUrl: 'http://localhost:3000',
            endPoint: 'modules',
            methods: [
                ServiceFunctionsEnum.Get,
                ServiceFunctionsEnum.Delete,
                ServiceFunctionsEnum.Save,
                ServiceFunctionsEnum.Update,
                ServiceFunctionsEnum.Find,
            ],
        },
    },
};