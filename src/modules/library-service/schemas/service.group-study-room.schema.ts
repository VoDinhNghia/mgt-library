import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type GroupStudyRoomServiceDocument = GroupStudyRoomService & Document;

@Schema()
export class GroupStudyRoomService {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  })
  users?: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'libraries',
  })
  library?: mongoose.Types.ObjectId;

  @Prop()
  brrowedTime: Date;

  @Prop()
  returnTime: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rooms',
  })
  room?: mongoose.Types.ObjectId;

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

export const GroupStudyRoomServiceSchema = SchemaFactory.createForClass(
  GroupStudyRoomService,
);
