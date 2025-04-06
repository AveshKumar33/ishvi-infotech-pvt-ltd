// book.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Book extends Document {
    @Prop({ required: true })
    title: string;

    @Prop()
    description?: string;

    @Prop({ required: true })
    price: number;

    @Prop()
    cover_image?: string;

    @Prop({ default: 0 })
    stock: number;

    @Prop()
    ISBN?: string;

    @Prop()
    code?: string;

    @Prop()
    sample_pdf?: string;

    @Prop({ default: true })
    status: boolean;

    @Prop({ type: Types.ObjectId, ref: 'Author', required: true })
    author: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Language', required: true })
    language: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Semester', required: true })
    semester: Types.ObjectId;

    @Prop({ type: [Types.ObjectId], ref: 'Course' })
    courses: Types.ObjectId[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
