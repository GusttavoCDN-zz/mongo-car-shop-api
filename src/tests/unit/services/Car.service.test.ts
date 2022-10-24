import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import { carRequest, carResponse } from '../../mocks/carsMocks';

describe('Car service tests', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carResponse);
  });

  after(() => {
    sinon.restore();
  });

  describe('Creating a car', () => {
    it('Should create with valid data', async () => {
      const newCar = await carService.create(carRequest);
      expect(newCar).to.be.deep.equal(carResponse);
    });

    it('Should throw an error when receive invalid data', async () => {
      try {
        await carService.create({} as any);
      } catch (error: any) {
        expect(error.message).to.be.equal(
          'Invalid fields. Verify the data and try again.'
        );
      }
    });
  });
});
