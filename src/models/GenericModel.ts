import { Model, isValidObjectId, UpdateQuery } from 'mongoose';
import { ErrorMessages, ValidationError } from '../errors';
import { IModel } from '../interfaces/IModel';

export default abstract class GenericModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public create = async (data: T): Promise<T> => this._model.create({ ...data });

  public read = async (): Promise<T[]> => this._model.find();

  public readOne = async (id: string): Promise<T | null> => {
    if (!isValidObjectId(id)) throw new ValidationError(ErrorMessages.InvalidID);
    return this._model.findById(id);
  };

  public update = async (id: string, data: T): Promise<T | null> => {
    if (!isValidObjectId(id)) throw new ValidationError(ErrorMessages.InvalidID);
    return this._model.findByIdAndUpdate(id, { ...data } as UpdateQuery<T>);
  };

  public delete = async (id: string): Promise<T | null> => {
    if (!isValidObjectId(id)) throw new ValidationError(ErrorMessages.InvalidID);
    return this._model.findByIdAndDelete(id);
  };
}
