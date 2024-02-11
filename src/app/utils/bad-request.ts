import CustomError from './custom-error';

export default class BadRequest extends CustomError {
  constructor(code: string, m: string, metadata?: any) {
    super(400, code, m, metadata);
  }
}
