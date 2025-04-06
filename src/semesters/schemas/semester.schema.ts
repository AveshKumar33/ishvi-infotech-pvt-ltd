// semester.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Semester extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    year?: number;
}

export const SemesterSchema = SchemaFactory.createForClass(Semester);
