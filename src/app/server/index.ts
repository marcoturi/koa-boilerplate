import { AwilixContainer } from 'awilix';
import { scopePerRequest } from 'awilix-koa';
import Koa from 'koa';
import koaLogger from 'koa-logger';

export type ServerOptions = {
  container: AwilixContainer;
};

export function createServer(options: ServerOptions): Koa {
  const app: Koa = new Koa();

  app.use(koaLogger((str) => console.debug(str)));
  app.use(scopePerRequest(options.container));

  return app;
}
