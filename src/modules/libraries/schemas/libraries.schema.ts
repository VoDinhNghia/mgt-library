import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type LibrariesDocument = Libraries & Document;

@Schema()
export class Libraries {
  @Prop({
    type: String,
    required: true,
  })
  name?: string;

  @Prop()
  foundYear?: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  })
  librarian?: mongoose.Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const LibrariesSchema = SchemaFactory.createForClass(Libraries);