import Koa from 'koa';
import pkg from '../../package.json';
import { env } from './config';
import { api } from './presentation';
import { createServer, ServerOptions } from './server';
import { AwilixContainer } from 'awilix';
import bootstrap from './bootstrap';
import { INodePostgres } from './core/infrastructure/store/database';

async function init() {
  try {
    const banner = `
    *********************************************************************************************
    *
    * ${pkg.description}
    * @version ${pkg.version}
    * @author ${pkg.author.name}
    *
    *********************************************************************************************`;
    console.debug(banner);

    const container: AwilixContainer = bootstrap();

    console.debug('Connection to NodePostgres :: Pending');
    const nodePostgres = container.resolve<INodePostgres>('database');
    await nodePostgres.connectDb();
    console.info('Connection to NodePostgres :: OK');

    const serverOptions: ServerOptions = {
      container,
    };
    const app: Koa = createServer(serverOptions);

    api(app);

    app.listen(env.server.port, () => {
      console.debug(
        `App started on port ${env.server.port} with environment ${env.nodeEnv}`,
      );
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

init();
