export default class ValidationError extends Error {
  public code = 400;

  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
