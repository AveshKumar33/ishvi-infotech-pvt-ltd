import { Types } from 'mongoose';

export class CreateBookDto {
    readonly title: string;
    readonly description?: string;
    readonly price: number;
    readonly cover_image?: string;
    readonly stock?: number;
    readonly ISBN?: string;
    readonly code?: string;
    readonly sample_pdf?: string;
    readonly status?: boolean;
    readonly author: Types.ObjectId;
    readonly language: Types.ObjectId;
    readonly semester: Types.ObjectId;
    readonly courses: Types.ObjectId[];
}