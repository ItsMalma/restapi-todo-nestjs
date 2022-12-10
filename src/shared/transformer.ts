import { ValueTransformer } from 'typeorm';

export class BigintColumnTransformer implements ValueTransformer {
  to(value: any) {
    return value;
  }

  from(value: any) {
    return Number(value);
  }
}
