import {
  AwilixContainer,
  InjectionMode,
  NameAndRegistrationPair,
  createContainer,
} from 'awilix';

import containers from './containers';

export default function configureContainer(
  deps?: NameAndRegistrationPair<unknown>,
): AwilixContainer {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });

  if (deps) container.register(deps);
  containers.forEach((c) => c(container));

  return container;
}
