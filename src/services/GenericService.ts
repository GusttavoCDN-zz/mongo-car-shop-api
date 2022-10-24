import { ErrorMessages } from '../errors';
import { IModel } from '../interfaces/IModel';

export default abstract class GenericService<T> {
  protected _model: IModel<T>;

  constructor(model: IModel<T>) {
    this._model = model;
  }

  abstract create(data: T): Promise<T>;

  public read = async (): Promise<T[]> => this._model.read();

  public readOne = async (id: string): Promise<T> => {
    const data = await this._model.readOne(id);

    if (!data) throw new Error(ErrorMessages.NotFound);
    return data;
  };

  public update = async (id: string, data: T): Promise<T> => {
    const item = await this._model.update(id, data);

    if (!item) throw new Error(ErrorMessages.NotFound);
    return item;
  };

  public delete = async (id: string): Promise<T> => {
    const data = await this._model.delete(id);

    if (!data) throw new Error(ErrorMessages.NotFound);
    return data;
  };
}
