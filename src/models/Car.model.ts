import { model, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import GenericModel from './GenericModel';

const carMongooseSchema = new Schema<ICar>({
  status: Boolean,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, {
  versionKey: false,
});

export default class Car extends GenericModel<ICar> {
  constructor() {
    super(model('Car', carMongooseSchema));
  }
}