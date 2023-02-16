import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DiviceComputerDocument = DiviceComputers & Document;

@Schema()
export class DiviceComputers {
  @Prop()
  mouse: {
    name: string;
    status: string;
  };

  @Prop()
  screen: {
    name: string;
    status: string;
  };

  @Prop()
  cpu: {
    name: string;
    status: string;
  };

  @Prop()
  headPhone: {
    name: string;
    status: string;
  };

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const DiviceComputerSchema =
  SchemaFactory.createForClass(DiviceComputers);
