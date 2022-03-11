/// <reference types="multer" />
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { HelperService } from '../common/helper';
import { JwtService } from '@nestjs/jwt';
export declare class DocumentController {
    private readonly documentService;
    private jwtService;
    private helperService;
    constructor(documentService: DocumentService, jwtService: JwtService, helperService: HelperService);
    create(createDocumentDto: CreateDocumentDto): string;
    accountStatus(body: any): Promise<{
        status: boolean;
        data: {};
    } | {
        status: boolean;
        data: {
            user_status: string;
            driver_status: string;
        };
    }>;
    updateStatus(body: any): Promise<{
        status: boolean;
        message: string;
    }>;
    uploadFile(body: any, files: Array<Express.Multer.File>): Promise<{
        status: boolean;
        message: any;
    }>;
}
