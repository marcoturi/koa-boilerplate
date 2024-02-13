import { Server } from 'http';
import { AwilixContainer } from 'awilix';
import Koa from 'koa';
import lodashMemoize from 'lodash.memoize';
import agent from 'supertest';
import http from 'http';
import { INodePostgres } from '../../src/app/core/infrastructure/store/database';
import { api } from '../../src/app/presentation';
import { createServer, ServerOptions } from '../../src/app/server';
import createTestContainer from './createTestContainer';

export interface IServerTest {
    request: agent.SuperTest<agent.Test>;
    app: Koa;
    container: AwilixContainer;
}

let server: Server;
let db: INodePostgres;
const parentContainer: AwilixContainer = createTestContainer();
let container: AwilixContainer;

const createTestServer = lodashMemoize(
    async (): Promise<IServerTest> => {
        container = parentContainer.createScope();
        db = container.resolve('database');
        await db.connectDb();

        const serverOptions: ServerOptions = { container };
        const app = createServer(serverOptions);

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        server = http.createServer(app.callback());

        api(app);

        await new Promise<void>((resolve) => server.listen(0, resolve));
        const request = agent(server);

        return {
            request,
            app,
            container,
        };
    },
);

beforeAll(async () => {
    // instance all global vars (_app, _db, etc...)
    await createTestServer();
});

afterEach(() => {
    container = parentContainer.createScope(); // this guarantees resetting the child container to its initial status after each test
});

afterAll(async () => {
    if (server) {
        await new Promise<void>(
            (resolve, reject) => server.close(
                (error?: Error) => !error ? resolve() : reject(error),
            ),
        );
        await db.disconnectDb();
    }
});

export default createTestServer;
