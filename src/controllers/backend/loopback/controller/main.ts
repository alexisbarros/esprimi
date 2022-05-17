import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { CodeToLoopbackControllerProperties } from "./properties/main";

export class CodeToLoopbackController {

    customControllerPropertyCode = new CodeToLoopbackControllerProperties;

    createComponentCode = async (
        modelName: string,
        object: MainInterface
    ): Promise<string> => {
        const controllerSkeletonCode = `
                                    import {authenticate} from '@loopback/authentication';
                                    import {inject} from '@loopback/core';
                                    import {repository} from '@loopback/repository';
                                    import {del, get, param, patch, post, put, Request, requestBody, response, Response, RestBindings} from '@loopback/rest';
                                    import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
                                    import {LocaleEnum} from '../enums/locale.enum';
                                    import {HttpDocumentation, HttpResponseToClient} from '../implementations/index';
                                    import {IHttpResponse} from '../interfaces/http.interface';
                                    import {%pascalfy(${modelName})%} from '../models/%kebabfy(${modelName})%.model';
                                    import {%pascalfy(${modelName})%Repository} from '../repositories/%kebabfy(${modelName})%.repository';
                                    import {serverMessages} from '../utils/server-messages';
                                    
                                    export class %pascalfy(${modelName})%Controller {
                                    
                                        constructor(
                                            @repository(%pascalfy(${modelName})%Repository) public repository: %pascalfy(${modelName})%Repository,
                                        
                                            @inject(RestBindings.Http.REQUEST) private httpRequest: Request,
                                            @inject(RestBindings.Http.RESPONSE) private httpResponse: Response,
                                        
                                            @inject(SecurityBindings.USER, {optional: true}) private currentUser?: UserProfile,
                                        ) { }
                                        
                                        @authenticate({strategy: 'autentikigo', options: {collection: '%pascalfy(${modelName})%', action: 'createOne'}})
                                        @post('/%pluralize(%kebabfy(${modelName})%)%')
                                        @response(200, {
                                            description: '%pascalfy(${modelName})% model instance',
                                            properties: HttpDocumentation.createDocResponseSchemaForFindOneResult(%pascalfy(${modelName})%)
                                        })
                                        async create(
                                            @requestBody({
                                                content: HttpDocumentation.createDocRequestSchema(%pascalfy(${modelName})%)
                                            }) data: %pascalfy(${modelName})%,
                                            @param.query.string('locale') locale?: LocaleEnum,
                                        ): Promise<IHttpResponse> {
                                            try {
                                        
                                                const createdBy = this.currentUser?.[securityId] as string;
                                                const ownerId = this.currentUser?.ownerId as string;

                                                const dataWithoutNullProperties = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
                                            
                                                const dataCreated = await this.repository.create({...dataWithoutNullProperties, _createdBy: createdBy, _ownerId: ownerId});
                                            
                                                return HttpResponseToClient.createHttpResponse({
                                                    data: dataCreated,
                                                    locale,
                                                    request: this.httpRequest,
                                                    response: this.httpResponse,
                                                })
                                        
                                            } catch (err: any) {
                                        
                                                return HttpResponseToClient.badRequestErrorHttpResponse({
                                                    logMessage: err.message,
                                                    locale,
                                                    request: this.httpRequest,
                                                    response: this.httpResponse,
                                                })
                                        
                                            }
                                        }
                                        
                                        @authenticate({strategy: 'autentikigo', options: {collection: '%pascalfy(${modelName})%', action: 'read'}})
                                        @get('/%pluralize(%kebabfy(${modelName})%)%')
                                        @response(200, {
                                            description: 'Array of %pascalfy(${modelName})% model instances',
                                            properties: HttpDocumentation.createDocResponseSchemaForFindManyResults(%pascalfy(${modelName})%)
                                        })
                                        async find(
                                            @param.query.number('limit') limit?: number,
                                            @param.query.number('page') page?: number,
                                            @param.query.string('order_by') orderBy?: string,
                                            @param.query.string('locale') locale?: LocaleEnum,
                                        ): Promise<IHttpResponse> {
                                            try {
                                        
                                                const filters = HttpDocumentation.createFilterRequestParams(this.httpRequest.url);
                                            
                                                const result = await this.repository.find({...filters, include: [%PROPERTIES_RELATED_FIND%]});
                                            
                                                const total = await this.repository.count(filters['where']);
                                            
                                                return HttpResponseToClient.okHttpResponse({
                                                    data: {total: total?.count, result},
                                                    locale,
                                                    request: this.httpRequest,
                                                    response: this.httpResponse,
                                                })
                                        
                                            } catch (err: any) {
                                        
                                                return HttpResponseToClient.badRequestErrorHttpResponse({
                                                    logMessage: err.message,
                                                    locale,
                                                    request: this.httpRequest,
                                                    response: this.httpResponse,
                                                })
                                        
                                            }
                                        }
                                        
                                        @authenticate({strategy: 'autentikigo', options: {collection: '%pascalfy(${modelName})%', action: 'readOne'}})
                                        @get('/%pluralize(%kebabfy(${modelName})%)%/{id}')
                                        @response(200, {
                                            description: '%pascalfy(${modelName})% model instance',
                                            properties: HttpDocumentation.createDocResponseSchemaForFindOneResult(%pascalfy(${modelName})%)
                                        })
                                        async findById(
                                            @param.path.string('id') id: string,
                                            @param.query.string('locale') locale?: LocaleEnum,
                                        ): Promise<IHttpResponse> {
                                            try {
                                        
                                                const data = await this.repository.findOne({
                                                    where: {and: [{_id: id}, {_deletedAt: {eq: null}}]},
                                                    include: [%PROPERTIES_RELATED_FIND_ONE%],
                                                });
                                                if (!data) throw new Error(serverMessages['httpResponse']['notFoundError'][locale ?? LocaleEnum['pt-BR']]);
                                            
                                                return HttpResponseToClient.okHttpResponse({
                                                    data,
                                                    locale,
                                                    request: this.httpRequest,
                                                    response: this.httpResponse,
                                                })
                                        
                                            } catch (err: any) {
                                        
                                                return HttpResponseToClient.badRequestErrorHttpResponse({
                                                    logMessage: err.message,
                                                    locale,
                                                    request: this.httpRequest,
                                                    response: this.httpResponse,
                                                })
                                        
                                            }
                                        }
                                        
                                        @authenticate({strategy: 'autentikigo', options: {collection: '%pascalfy(${modelName})%', action: 'updateOne'}})
                                        @put('/%pluralize(%kebabfy(${modelName})%)%/{id}')
                                        @response(200, {description: '%pascalfy(${modelName})% PUT success'})
                                        async updateById(
                                            @param.path.string('id') id: string,
                                            @requestBody({
                                                content: HttpDocumentation.createDocRequestSchema(%pascalfy(${modelName})%)
                                            }) data: %pascalfy(${modelName})%,
                                            @param.query.string('locale') locale?: LocaleEnum,
                                        ): Promise<IHttpResponse> {
                                            try {

                                                const dataWithoutNullProperties = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
                                        
                                                await this.repository.updateById(id, dataWithoutNullProperties);
                                            
                                                return HttpResponseToClient.noContentHttpResponse({
                                                    locale,
                                                    request: this.httpRequest,
                                                    response: this.httpResponse,
                                                })
                                        
                                            } catch (err: any) {
                                        
                                                return HttpResponseToClient.badRequestErrorHttpResponse({
                                                    logMessage: err.message,
                                                    locale,
                                                    request: this.httpRequest,
                                                    response: this.httpResponse,
                                                })
                                        
                                            }
                                        }
                                        
                                        @authenticate({strategy: 'autentikigo', options: {collection: '%pascalfy(${modelName})%', action: 'updateOne'}})
                                        @patch('/%pluralize(%kebabfy(${modelName})%)%/{id}')
                                        @response(200, {description: '%pascalfy(${modelName})% PATCH success'})
                                        async partialUpdateById(
                                            @param.path.string('id') id: string,
                                            @requestBody({
                                                content: HttpDocumentation.createDocRequestSchema(%pascalfy(${modelName})%)
                                            }) data: %pascalfy(${modelName})%,
                                            @param.query.string('locale') locale?: LocaleEnum,
                                        ): Promise<IHttpResponse> {
                                            try {

                                                const dataWithoutNullProperties = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
                                        
                                                await this.repository.updateById(id, dataWithoutNullProperties);
                                            
                                                return HttpResponseToClient.noContentHttpResponse({
                                                    locale,
                                                    request: this.httpRequest,
                                                    response: this.httpResponse,
                                                })
                                        
                                            } catch (err: any) {
                                        
                                                return HttpResponseToClient.badRequestErrorHttpResponse({
                                                    logMessage: err.message,
                                                    locale,
                                                    request: this.httpRequest,
                                                    response: this.httpResponse,
                                                })
                                        
                                            }
                                        }
                                        
                                        @authenticate({strategy: 'autentikigo', options: {collection: '%pascalfy(${modelName})%', action: 'deleteOne'}})
                                        @del('/%pluralize(%kebabfy(${modelName})%)%/{id}')
                                        @response(204, {description: 'Project DELETE success'})
                                        async deleteById(
                                            @param.path.string('id') id: string,
                                            @param.query.string('locale') locale?: LocaleEnum,
                                        ): Promise<IHttpResponse> {
                                            try {
                                        
                                                const dataToDelete = await this.repository.findById(id);
                                            
                                                await this.repository.updateById(id, {...dataToDelete, _deletedAt: new Date()});
                                            
                                                return HttpResponseToClient.noContentHttpResponse({
                                                    locale,
                                                    request: this.httpRequest,
                                                    response: this.httpResponse,
                                                })
                                        
                                            } catch (err: any) {
                                        
                                                return HttpResponseToClient.badRequestErrorHttpResponse({
                                                    logMessage: err.message,
                                                    locale,
                                                    request: this.httpRequest,
                                                    response: this.httpResponse,
                                                })
                                        
                                            }
                                        }
                                    }
                                    `;

        let code = controllerSkeletonCode;

        const propertiesRelatedCode = this.customControllerPropertyCode.createProperties(object);
        code = code.replace('%PROPERTIES_RELATED_FIND%', propertiesRelatedCode);
        code = code.replace('%PROPERTIES_RELATED_FIND_ONE%', propertiesRelatedCode);

        code = TextTransformation.replaceKebabfyFunctionToString(code);
        code = TextTransformation.replacePascalfyFunctionToString(code);
        code = TextTransformation.replacePlurarizeFunctionToString(code);

        return code;
    };
}
