import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type DiviceComputersLibraryDocument = DiviceComputersLibrary & Document;

@Schema()
export class DiviceComputersLibrary {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mgtcomputerslibraries',
  })
  mgtComputers?: mongoose.Types.ObjectId;

  @Prop()
  mouse: string;

  @Prop()
  screen: string;

  @Prop()
  cpu: string;

  @Prop()
  headPhone: string;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const DiviceComputersLibrarySchema = SchemaFactory.createForClass(
  DiviceComputersLibrary,
);
