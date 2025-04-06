import { Document } from 'mongoose';

export interface AuthorDocument extends Document {
    name: string;
    bio?: string;
    profile_picture?: string;
    email?: string;
    mobile?: string;
    contents?: string[];
}
