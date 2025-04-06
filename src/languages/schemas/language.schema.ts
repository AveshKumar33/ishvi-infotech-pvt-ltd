import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Language extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    code: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
