import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ElibraryServiceType } from 'src/constants/constant';

export type ServiceLibraryDocument = Servicelibrary & Document;

@Schema()
export class Servicelibrary {
  @Prop({
    type: String,
    required: true,
  })
  name?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'libraries',
  })
  library?: mongoose.Types.ObjectId;

  @Prop({ default: ElibraryServiceType.BORROW_BOOK })
  type?: string; // borrow books, magazine, borrow a group room, Reserve your seat in advance

  @Prop()
  cost?: number;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const ServiceSchema = SchemaFactory.createForClass(Servicelibrary);
