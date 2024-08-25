class ErrorHandler extends Error {
  statusCode: number;

  constructor(message:any, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Set the prototype explicitly.
    // Object.setPrototypeOf(this, CustomError.prototype);
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ErrorHandler;

// Previous error handler, still work but the difference between this below and that above is 
// that the above is a class and the below is a function
// For the above, I have a separate error code that list all the error in error.ts and its message
// For the below, I have a single error code and all the error message and code will be manually added 
//  to every route handler



// class CustomError extends Error {
//   status: number;

//   constructor(status: number, message: string) {
//     super(message);
//     this.status = status;

//     // Set the prototype explicitly.
//     Object.setPrototypeOf(this, CustomError.prototype);
//   }
// }

// export const errorHandler = (status: number, message: string) => {
//   return new CustomError(status, message);
// };
