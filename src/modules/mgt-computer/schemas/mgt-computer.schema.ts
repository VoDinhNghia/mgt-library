import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type MgtComputersLibraryDocument = MgtComputersLibrary & Document;

@Schema()
export class MgtComputersLibrary {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rooms',
  })
  room?: mongoose.Types.ObjectId;

  @Prop()
  numberId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'libraries',
  })
  library?: mongoose.Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const MgtComputersLibrarySchema =
  SchemaFactory.createForClass(MgtComputersLibrary);
