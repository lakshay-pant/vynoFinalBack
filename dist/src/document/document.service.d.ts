import { CreateDocumentDto } from './dto/create-document.dto';
import { Model } from 'mongoose';
export declare class DocumentService {
    private documentsModel;
    constructor(documentsModel: Model<CreateDocumentDto>);
    create(createDocumentDto: CreateDocumentDto): string;
    findAll(): string;
    findOne(id: number): string;
    checkData(id: any, role: any): import("mongoose").Query<import("mongoose").Document<any, any, CreateDocumentDto> & CreateDocumentDto & {
        _id: unknown;
    }, import("mongoose").Document<any, any, CreateDocumentDto> & CreateDocumentDto & {
        _id: unknown;
    }, {}, CreateDocumentDto>;
    checkAccountStatusFromId(user_id: any): import("mongoose").Query<(import("mongoose").Document<any, any, CreateDocumentDto> & CreateDocumentDto & {
        _id: unknown;
    })[], import("mongoose").Document<any, any, CreateDocumentDto> & CreateDocumentDto & {
        _id: unknown;
    }, {}, CreateDocumentDto>;
    updateInsert(id: any, role: any, data: any, type: any): import("mongoose").Query<import("mongoose").Document<any, any, CreateDocumentDto> & CreateDocumentDto & {
        _id: unknown;
    }, import("mongoose").Document<any, any, CreateDocumentDto> & CreateDocumentDto & {
        _id: unknown;
    }, {}, CreateDocumentDto> | Promise<import("mongoose").Document<any, any, CreateDocumentDto> & CreateDocumentDto & {
        _id: unknown;
    }>;
    remove(id: number): string;
}
