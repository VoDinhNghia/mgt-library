import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type BookCategoryDocument = BookCategory & Document;

@Schema()
export class BookCategory {
  @Prop({
    type: String,
    required: true,
  })
  name?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bookshefts',
  })
  booksheft?: mongoose.Types.ObjectId;

  @Prop()
  description?: string;

  @Prop()
  amount?: number;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const BookCategorySchema = SchemaFactory.createForClass(BookCategory);
