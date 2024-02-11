import koaBody from 'koa-body';
import compose from 'koa-compose';
import helmet from 'koa-helmet';
import respond from 'koa-respond';
import cors from '@koa/cors';
import errorHandler from './handle-error';

export default function () {
  return compose([
    errorHandler(),
    helmet(),
    cors(),
    respond(), // adds ctx.ok(), ctx.notFound(), etc..
    koaBody(),
  ]);
}
