import 'express-async-errors';
import { Application } from 'express';
import carsRouter from './cars.routes';

export default (app: Application) => {
  app.use(carsRouter);
};
