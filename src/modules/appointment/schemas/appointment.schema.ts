import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { EstatusAppoinment } from 'src/constants/constant';

export type LibraryAppointmentDocument = LibraryAppointment & Document;

@Schema()
export class LibraryAppointment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profiles',
  })
  user?: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'servicelibrarys',
  })
  service?: mongoose.Types.ObjectId;

  @Prop()
  receivedDate?: Date;

  @Prop({ default: EstatusAppoinment.ACCEPTED })
  status?: string; // expired, accepted, cancel,

  @Prop()
  returnSchedule?: Date;

  @Prop()
  extensionDate?: Date;

  @Prop()
  extensionCost?: number;

  @Prop()
  cost?: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'books',
  })
  book?: mongoose.Types.ObjectId;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'rooms',
  })
  room?: [mongoose.Types.ObjectId];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'news',
  })
  magazine?: mongoose.Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const LibraryAppointmentSchema =
  SchemaFactory.createForClass(LibraryAppointment);
