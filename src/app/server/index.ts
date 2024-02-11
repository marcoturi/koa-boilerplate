import { AwilixContainer } from 'awilix';
import { scopePerRequest } from 'awilix-koa';
import Koa from 'koa';
import koaLogger from 'koa-logger';
import middleware from './middleware';

export type ServerOptions = {
  container: AwilixContainer;
};

export function createServer({ container }: ServerOptions): Koa {
  const app: Koa = new Koa();

  app.use(koaLogger((str) => console.debug(str)));
  app.use(scopePerRequest(container));

  app.use(middleware());


  return app;
}
