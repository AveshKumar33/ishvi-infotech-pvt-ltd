import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Course extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ unique: true })
    code: string;

    @Prop()
    description?: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
