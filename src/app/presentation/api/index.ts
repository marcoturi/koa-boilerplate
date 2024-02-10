import * as Koa from 'koa';
import Router from 'koa-router';

import * as pkg from '../../../../package.json';

import controllers from './controllers';
import applyControllers from '../../utils/applyControllers';

export default function api(app: Koa): Koa {
  const router = new Router<Koa.DefaultState, Koa.Context>({
    prefix: '/api',
  });

  // Return the package's current version
  router.get('/public/version', (ctx) => ctx.ok({ version: pkg.version }));

  // apply routing by controllers
  applyControllers(router, controllers);

  // Install routes
  app.use(router.allowedMethods());
  app.use(router.routes());

  return app;
}
