import { Document, Types } from 'mongoose';

export interface BookDocument extends Document {
    title: string;
    description?: string;
    price: number;
    cover_image?: string;
    stock?: number;
    ISBN?: string;
    code?: string;
    sample_pdf?: string;
    status: boolean;
    author: Types.ObjectId;
    language: Types.ObjectId;
    semester: Types.ObjectId;
    courses: Types.ObjectId[];
}
