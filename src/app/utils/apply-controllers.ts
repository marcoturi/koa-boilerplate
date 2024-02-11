import Router from '@koa/router';
import { getStateAndTarget } from 'awilix-router-core';
import registerController from './register-controller';

export default function applyControllers(
  router: Router<any, any>,
  controllers: any[],
): void {
  controllers.forEach((controller) => {
    const stateAndTarget = getStateAndTarget(controller);

    if (!stateAndTarget) {
      return;
    }

    registerController(router, stateAndTarget);
  });
}
