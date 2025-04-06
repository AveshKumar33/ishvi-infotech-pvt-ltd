import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Author extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    bio?: string;

    @Prop()
    profile_picture?: string;

    @Prop()
    email?: string;

    @Prop()
    mobile?: string;

    @Prop({ type: [String] })
    contents: string[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
