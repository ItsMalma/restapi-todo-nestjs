import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends BadRequestException {
  public errorsPayload: { [field: string]: string[] } = {};

  public constructor(validationErrors: ValidationError[]) {
    const errorsPayload = {};
    validationErrors.map((validationError) => {
      if (!(validationError.property in errorsPayload)) {
        errorsPayload[validationError.property] = [];
      }
      Object.getOwnPropertyNames(validationError.constraints).forEach((key) => {
        errorsPayload[validationError.property].push(
          validationError.constraints[key],
        );
      });
    });
    super(errorsPayload);
    this.errorsPayload = errorsPayload;
  }
}
