import { makeInvoker } from 'awilix-koa';
import { HttpVerbs, IStateAndTarget, rollUpState } from 'awilix-router-core';
import Router from '@koa/router';

export default function registerController(
  router: Router,
  stateAndTarget: IStateAndTarget,
): void {
  const { state, target } = stateAndTarget;
  const invoker = makeInvoker(target as any);
  const rolledUp = rollUpState(state);

  rolledUp.forEach((methodCfg, methodName) => {
    methodCfg.verbs.forEach((httpVerb) => {
      let method = httpVerb.toLowerCase();
      if (httpVerb === HttpVerbs.ALL) {
        method = 'all';
      }

      (router as any)[method](
        methodCfg.paths,
        ...methodCfg.beforeMiddleware,
        invoker(methodName),
        ...methodCfg.afterMiddleware,
      );
    });
  });
}
