import { asFunction, AwilixContainer } from 'awilix';
import exampleService from '../../core/application/example/example.service';
import database from '../../core/infrastructure/store/database';
import { env } from '../../config';

export default function register(container: AwilixContainer): AwilixContainer {
  return container.register({
    exampleService: asFunction(exampleService).scoped(),
    database: asFunction(database).inject(() => ({
      dbPort: env.db.port,
      dbName: env.db.name,
      dbHost: env.db.host,
      dbUsername: env.db.username,
      dbPassword: env.db.password,
    })),
  });
}

