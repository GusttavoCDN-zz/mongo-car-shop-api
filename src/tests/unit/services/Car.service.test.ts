import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import { carRequest, carResponse, carsResponse } from '../../mocks/carsMocks';
import { ErrorMessages } from '../../../errors';

describe('Car service tests', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carResponse);
    sinon.stub(carModel, 'read').resolves(carsResponse);
    sinon.stub(carModel, 'readOne').onFirstCall().resolves(carResponse);
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

  describe('Listing all cars', () => {
    it('Should list all cars', async () => {
      const cars = await carService.read();
      expect(cars).to.be.deep.equal(carsResponse);
    });
  });

  describe('Listing a car', () => {
    it('Should list a car when receive a valid id', async () => {
      const car = await carService.readOne(carResponse._id);
      expect(car).to.be.deep.equal(carResponse);
    });

    it('Should throw an error when an object id was not found', async () => {
      try {
        await carService.readOne('Inexistent_id');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorMessages.NotFound);
      }
    });
  });
});
