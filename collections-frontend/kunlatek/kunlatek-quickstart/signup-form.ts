import { FormButtonTypeEnum, FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const SIGNUP_FORM: MainInterface = {
    frontendFramework: FrontendFrameworkEnum.Angular,
    form: {
        title: 'Cadastro',
        id: 'signupForm',
        elements: [
            {
                button: {
                    label: 'Sou uma pessoa',
                    type: FormButtonTypeEnum.Button,
                    icon: 'person',
                }
            }, {
                button: {
                    label: 'Sou uma empresa',
                    type: FormButtonTypeEnum.Button,
                    icon: 'business',
                },
            },
        ],
        service: {
            baseUrl: 'http://localhost:3000',
            endPoint: 'signup',
            hasAuthorization: true,
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