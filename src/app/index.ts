import Koa from 'koa';
import pkg from '../../package.json';
import { env } from './config';
import { api } from './presentation';
import { createServer, ServerOptions } from './server';
import { AwilixContainer } from 'awilix';
import bootstrap from './bootstrap';

function init() {
  try {
    // const db = staticContainer.resolve<IDatabase>('database');

    const banner = `
    *********************************************************************************************
    *
    * ${pkg.description}
    * @version ${pkg.version}
    * @author ${pkg.author.name}
    *
    *********************************************************************************************`;
    console.debug(banner);

    // const info: any = await db.connectDb(env.mongo.uri);
    // if (info) {
    //     console.debug(`Connected to ${info.host}:${info.port}/${info.name}`);
    // }
    const container: AwilixContainer = bootstrap();
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
