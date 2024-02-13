/* eslint-disable @typescript-eslint/no-var-requires */

process.env.NODE_ENV = 'test';
process.env.ENVIRONMENT = 'development';
process.env.SERVER_BASE_URL = 'http://localhost:3000/api';
process.env.NODE_PORT = '3002';
process.env.DB_USER='postgres';
process.env.DB_PASSWORD='test';
process.env.DB_NAME='postgres';
process.env.DB_HOST='localhost';
process.env.DB_PORT='5432';

const database = require('../src/app/core/infrastructure/store/database').default;

export default async function globalSetup() {
    const db = database({
        dbPort: process.env.DB_PORT,
        dbName: process.env.DB_NAME,
        dbHost: process.env.DB_HOST,
        dbUsername: process.env.DB_NAME,
        dbPassword: process.env.DB_PASSWORD,
    });
    await db.connectDb();
    await db.disconnectDb();
}
