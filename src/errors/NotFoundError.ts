export default class NotFoundError extends Error {
  public code = 404;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
