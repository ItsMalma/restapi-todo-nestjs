export class Payload {
  status: number;
  data?: any;
  error?: string;
  errors?: string[] | { [field: string]: string };

  public constructor(
    status: number,
    data?: any,
    error?: string,
    errors?: string[] | { [field: string]: any },
  ) {
    this.status = status;
    this.data = data;
    this.error = error;
    this.errors = errors;
  }
}
