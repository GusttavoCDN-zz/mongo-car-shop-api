import { ErrorRequestHandler } from 'express';
import { ValidationError } from '../errors';
import NotFoundError from '../errors/NotFoundError';

const errorHandler: ErrorRequestHandler = (error, request, response, _next) => {
  if (error instanceof ValidationError) {
    return response.status(error.code).json({ error: error.message });
  }

  if (error instanceof NotFoundError) {
    return response.status(error.code).json({ error: error.message });
  }
  
  return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
