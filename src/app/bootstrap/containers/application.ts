import { asValue, AwilixContainer } from 'awilix';

export default function register(container: AwilixContainer): AwilixContainer {
  return container.register({
    currentUser: asValue(null),
  });
}
