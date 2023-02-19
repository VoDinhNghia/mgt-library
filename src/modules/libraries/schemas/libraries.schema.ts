import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { numberIdLibrary } from 'src/commons/constants';

export type LibrariesDocument = Libraries & Document;

@Schema()
export class Libraries {
  @Prop({
    type: String,
    required: true,
  })
  name?: string;

  @Prop({
    required: true,
    default: numberIdLibrary,
  })
  numberId?: string;

  @Prop()
  foundYear?: string;

  @Prop()
  description?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profiles',
  })
  librarian?: mongoose.Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const LibrariesSchema = SchemaFactory.createForClass(Libraries);
