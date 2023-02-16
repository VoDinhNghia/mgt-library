import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ComputerServiceDocument = ComputerService & Document;

@Schema()
export class ComputerService {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  })
  users?: mongoose.Types.ObjectId;

  @Prop()
  browedTime: Date;

  @Prop()
  returnTime: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mgtcomputers',
  })
  computer?: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'servicelibrarys',
  })
  service?: mongoose.Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const ComputerServiceSchema =
  SchemaFactory.createForClass(ComputerService);
