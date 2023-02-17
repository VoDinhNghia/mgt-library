import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryBookDocument = CategoryBook & Document;

@Schema()
export class CategoryBook {
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
  discription?: string;

  @Prop()
  amount?: number;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const CategoryBookSchema = SchemaFactory.createForClass(CategoryBook);
