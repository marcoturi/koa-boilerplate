import CustomError from './custom-error';

export default class GenericError extends CustomError {
  constructor(code: string, m: string, metadata?: any) {
    super(500, code, m, metadata);
  }
}
