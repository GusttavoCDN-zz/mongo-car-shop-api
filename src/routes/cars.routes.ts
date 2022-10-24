import { Router } from 'express';
import CarController from '../controllers/Car.controller';
import Car from '../models/Car.model';
import CarService from '../services/Car.service';

const carsRouter = Router();

const carModel = new Car();
const carService = new CarService(carModel);
const carController = new CarController(carService);

carsRouter.post('/cars', carController.create);
carsRouter.get('/cars', carController.read);
carsRouter.get('/cars/:id', carController.readOne);

export default carsRouter;