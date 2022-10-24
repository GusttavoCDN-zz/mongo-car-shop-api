import { ErrorRequestHandler } from 'express';
import { ValidationError } from '../errors';

const errorHandler: ErrorRequestHandler = (error, request, response, _next) => {
  if (error instanceof ValidationError) {
    return response.status(error.code).json({ message: error.message });
  }
  
  return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
