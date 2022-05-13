import {
  FormButtonTypeEnum,
  FormInputTypeEnum,
  ServiceFunctionsEnum,
} from "../../../src/enums/form";
import {
  BackendFrameworkEnum,
  FrontendFrameworkEnum,
} from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const PROJECT_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    title: "Projeto",
    id: "projectForm",
    elements: [
      {
        input: {
          label: "Nome",
          name: "name",
          placeholder: "Nome do projeto",
          type: FormInputTypeEnum.Text,
          isRequired: true,
        },
      },
      {
        input: {
          label: "Pasta de projetos",
          name: "folder",
          placeholder: "Pasta EXISTENTE onde ficam os projetos",
          type: FormInputTypeEnum.Text,
          isRequired: true,
        },
      },
      {
        input: {
          label: "Projeto base (public repo)",
          name: "quickstart",
          placeholder: "Ex.: https://github.com/ryzzan/kunlatek-quickstart",
          type: FormInputTypeEnum.Url,
          isRequired: true,
        },
      },
      {
        select: {
          label: "Framework do backend",
          name: "backendFramework",
          type: FormInputTypeEnum.Text,
          optionsObject: [
            {
              label: "Django",
              value: "Django",
            },
            {
              label: "Gin",
              value: "Gin",
            },
            {
              label: "Loopback",
              value: "Loopback",
            },
            {
              label: "Nest",
              value: "Nest",
            },
            {
              label: "Springboot",
              value: "Springboot",
            },
          ],
        },
      },
      {
        select: {
          label: "Framework do frontend",
          name: "frontendFramework",
          type: FormInputTypeEnum.Text,
          optionsObject: [
            {
              label: "Angular",
              value: "Angular",
            },
            {
              label: "Flutter",
              value: "Flutter",
            },
            {
              label: "React",
              value: "React",
            },
            {
              label: "Svelte",
              value: "Svelte",
            },
            {
              label: "Vue",
              value: "Vue",
            },
          ],
        },
      },
      {
        select: {
          label: "Módulos",
          name: "moduleId",
          isMultiple: true,
          type: FormInputTypeEnum.Text,
          optionsApi: {
            endpoint: "modules",
            labelField: "title",
            valueField: "id",
          },
        },
      },
    ],
    actions: [
      {
        button: {
          label: "Criar",
          type: FormButtonTypeEnum.Submit,
          icon: "save",
        },
      },
    ],
    service: {
      hasAuthorization: true,
      baseUrl: "http://localhost:3000",
      endPoint: "projects",
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
