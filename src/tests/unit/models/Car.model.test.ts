import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Car.model';
import { Model } from 'mongoose';
import { carRequest, carResponse, carsResponse } from '../../mocks/carsMocks';

describe('Car model tests', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carResponse);
    sinon.stub(Model, 'find').resolves(carsResponse);
    sinon
      .stub(Model, 'findById')
      .onFirstCall().resolves(carResponse)
      .onSecondCall().resolves(null);
    sinon
      .stub(Model, 'findByIdAndUpdate')
      .onFirstCall().resolves(carResponse)
      .onSecondCall().resolves(null);
    sinon
      .stub(Model, 'findByIdAndDelete')
      .onFirstCall().resolves(carResponse)
      .onSecondCall().resolves(null);
  });

  after(() => {
    sinon.restore();
  });

  describe('Creating a car', () => {
    it('Should create a car', async () => {
      const newCar = await carModel.create(carRequest);
      expect(newCar).to.be.deep.equal(carResponse);
    });
  });

  describe('Listing all cars', () => {
    it('Should list all cars', async () => {
      const cars = await carModel.read();
      expect(cars).to.be.deep.equal(carsResponse);
    });
  });

  describe('Listing a car', () => {
    it('Should list a car when receive a valid id', async () => {
      const car = await carModel.readOne(carResponse._id);
      expect(car).to.be.deep.equal(carResponse);
    });

    it('Should throw an error when receive an invalid id', async () => {
      try {
        await carModel.readOne('invalid_id');
      } catch (error: any) {
        expect(error.message).to.be.equal('Invalid ID');
      }
    });

    it('Should return null when id does not exist', async () => {
      const car = await carModel.readOne('4edd40c86762e0fb12000003');
      expect(car).to.be.null;
    });
  });

  describe('Updating a car', () => {
    it('Should update a car when receive a valid id', async () => {
      const updatedCar = await carModel.update(carResponse._id, carRequest);
      expect(updatedCar).to.be.deep.equal(carResponse);
    });

    it('Should throw an error when receive an invalid id', async () => {
      try {
        await carModel.update('invalid_id', carRequest);
      } catch (error: any) {
        expect(error.message).to.be.equal('Invalid ID');
      }
    });

    it('Should return null when id does not exist', async () => {
      const updatedCar = await carModel.update('4edd40c86762e0fb12000003', carRequest);
      expect(updatedCar).to.be.null;
    });
  });

  describe('Deleting a car', () => {
    it('Should delete a car when receive a valid id', async () => {
      const deletedCar = await carModel.delete(carResponse._id);
      expect(deletedCar).to.be.deep.equal(carResponse);
    });

    it('Should throw an error when receive an invalid id', async () => {
      try {
        await carModel.delete('invalid_id');
      } catch (error: any) {
        expect(error.message).to.be.equal('Invalid ID');
      }
    });

    it('Should return null when id does not exist', async () => {
      const deletedCar = await carModel.delete('4edd40c86762e0fb12000003');
      expect(deletedCar).to.be.null;
    });
  });
});
