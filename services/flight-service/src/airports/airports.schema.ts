import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AirportDocument = HydratedDocument<Airport>;

@Schema()
export class Airport {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  iata: string;

  @Prop({ required: true })
  name: string;
}

export const AirportSchema = SchemaFactory.createForClass(Airport);
