import { Context } from 'koa';
import CustomError from './custom-error';

export type ErrorHandler = (err: Error | CustomError, ctx?: Context) => unknown;

export default function errorHandler(handler?: ErrorHandler) {
  return async (ctx: Context, next: () => Promise<any>) => {
    // https://github.com/koajs/koa/wiki/Error-Handling
    // https://github.com/koajs/koa/blob/master/docs/api/context.md#ctxthrowstatus-msg-properties

    try {
      await next();
    } catch (err: any) {
      // Emit an error event that can be handled outside in the standard Koa way
      // https://github.com/koajs/koa/blob/master/docs/api/index.md#error-handling
      ctx.app.emit('error', err, ctx);

      // Use the handler if specified
      if (handler) {
        const shouldStop = await handler.apply(undefined, [err, ctx]);

        if (typeof shouldStop !== 'undefined') {
          return shouldStop;
        }
      }

      if (err instanceof CustomError) {
        return ctx.send(err.status, err.toObject());
      } else {
        // Handle standard Javascript errors
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = err.message;
      }
    }
  };
}
