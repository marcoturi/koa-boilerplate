import { Pool, QueryResult } from 'pg';

export interface INodePostgres {
  pool: Pool;
  connectDb(): Promise<Pool>;
  query(text: string, params: any): Promise<QueryResult>;
  disconnectDb(): Promise<void>;
}

interface ServiceType {
  dbPort: number;
  dbName: string;
  dbHost: string;
  dbUsername: string;
  dbPassword: string;
}

let pool: Pool;

export default function ({
  dbPort,
  dbName,
  dbHost,
  dbUsername,
  dbPassword,
}: ServiceType): INodePostgres {
  const connectDb = async (): Promise<Pool> => {
    pool = new Pool({
      user: dbUsername,
      host: dbHost,
      database: dbName,
      password: dbPassword,
      port: dbPort,
    });
    await pool.query('SELECT NOW()');

    pool.on('error', (err) => {
      console.error('node-postgres: Unexpected error on idle client', err);
      process.exit(-1);
    });

    return pool;
  };

  const query = (text: string, params: any): Promise<QueryResult> => {
    return pool.query(text, params);
  };

  const disconnectDb = async (): Promise<void> => {
    await pool.end();
  };

  return {
    pool,
    query,
    connectDb,
    disconnectDb,
  };
}
