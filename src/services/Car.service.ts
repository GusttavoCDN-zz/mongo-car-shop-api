import { ValidationError } from '../errors';
import { CarSchema, ICar } from '../interfaces/ICar';
import GenericService from './GenericService';

export default class CarService extends GenericService<ICar> {
  public create = async (data: ICar): Promise<ICar> => {
    const { success } = CarSchema.safeParse(data);

    if (!success) { throw new ValidationError('Invalid fields. Verify the data and try again.'); }

    return this._model.create(data);
  };
}
