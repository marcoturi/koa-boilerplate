import { asFunction, AwilixContainer } from 'awilix';
import { exampleRepository } from '../../core/infrastructure/repositories/example/example.repository';


export default function register(container: AwilixContainer): AwilixContainer {
  return container.register({
    exampleRepository: asFunction(exampleRepository).singleton(),
  });
}
