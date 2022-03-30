import {
    BuildedBackendCode,
    MainInterface
} from "../interfaces/main"
import {
    CodeToLoopback
} from './backend/loopback/main'

export class BackendCode {
    codeToLoopback

    constructor() {
        this.codeToLoopback = new CodeToLoopback
    }

    createCode = async (
        object: MainInterface
    ): Promise<BuildedBackendCode | undefined> => {
        switch (object.backendFramework) {
            case 'LOOPBACK':
                return await this.codeToLoopback.createCode(object)
                break;

            case 'NEST':
                // TO-DO
                break;

            case 'GIN':
                // TO-DO
                break;

            case 'DJANGO':
                // TO-DO
                break;

            case 'SPRINGBOOT':
                // TO-DO
                break;

            default:
                console.info('None or unknown frontend framework chosen.')
                return {
                    model: '',
                    controller: '',
                    repository: '',
                    service: '',
                };

                break;
        }
    }
}