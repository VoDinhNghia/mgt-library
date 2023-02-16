import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type LibraryHistoryDocument = LibraryHistory & Document;

@Schema()
export class LibraryHistory {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profiles',
  })
  user?: mongoose.Types.ObjectId;

  @Prop()
  checkinAt: Date;

  @Prop()
  checkoutAt: Date;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const LibraryHistorySchema =
  SchemaFactory.createForClass(LibraryHistory);
