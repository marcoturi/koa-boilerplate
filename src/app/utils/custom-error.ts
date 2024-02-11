export type StatusError = 400 | 401 | 403 | 404 | 409 | 500;

const defaultStatus = 500;
const defaultCode = 'GenericError';

export default class CustomError extends Error {
  status = defaultStatus;
  code = defaultCode;
  metadata = {};

  constructor(status: StatusError, code: string, m: string, metadata: any) {
    super(`${status || defaultStatus}: ${code || defaultCode} - ${m}`);

    if (status) {
      this.status = status;
    }
    if (code) {
      this.code = code;
    }
    if (metadata) {
      this.metadata = metadata;
    }
  }

  toObject() {
    return {
      code: this.code,
      status: this.status,
      message: this.message,
      metadata: this.metadata,
    };
  }
}
