import { Document } from 'mongoose';

export interface CourseDocument extends Document {
    name: string;
    code?: string;
    description?: string;
}
