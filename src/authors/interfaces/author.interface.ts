import { Document } from 'mongoose';

export interface Author extends Document {
    name: string;
    bio?: string;
    profile_picture?: string;
    email?: string;
    mobile?: string;
    contents?: string[];
}
