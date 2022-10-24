import { Request, Response } from 'express';
import CarService from '../services/Car.service';

export default class CarController {
  private _carService: CarService;

  constructor(carService: CarService) {
    this._carService = carService;
  }

  public read = async (req: Request, res: Response) => {
    const cars = await this._carService.read();
    res.status(200).json(cars);
  };

  public readOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const car = await this._carService.readOne(id);
    res.status(200).json(car);
  };

  public create = async (request: Request, response: Response): Promise<Response> => {
    const { model, year, color, buyValue, doorsQty, seatsQty } = request.body;

    const car = await this._carService.create({
      model,
      year,
      color,
      buyValue,
      doorsQty,
      seatsQty,
    });
    
    return response.status(201).json(car);
  };
}
