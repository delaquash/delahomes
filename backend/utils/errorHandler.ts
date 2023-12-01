class CustomError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const errorHandler = (status: number, message: string) => {
  return new CustomError(status, message);
};
