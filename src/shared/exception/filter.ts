import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { Payload } from '../payload';
import { ValidationException } from './validation.exception';

@Catch()
export class CustomExceptionFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): void {
    console.log(exception);
    const res = host.switchToHttp().getResponse<Response>();
    if (exception) {
      if (exception instanceof HttpException) {
        if (exception instanceof ValidationException) {
          res
            .status(exception.getStatus())
            .json(
              new Payload(
                exception.getStatus(),
                undefined,
                undefined,
                exception.errorsPayload,
              ),
            );
          return;
        }
        res
          .status(exception.getStatus())
          .json(
            new Payload(exception.getStatus(), undefined, exception.message),
          );
        return;
      }
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new Payload(
            HttpStatus.INTERNAL_SERVER_ERROR,
            undefined,
            'Internal Server Error',
          ),
        );
    }
  }
}

export function handleValidatorException(errors: ValidationError[]) {
  return new ValidationException(errors);
}
