import { INodePostgres } from '../../store/database';
import GenericError from '../../../../utils/generic-error';

type ServiceType = {
  database: INodePostgres;
};

export function exampleRepository({ database }: ServiceType) {
  async function fetch(text: string) {
    try {
      if(database) {
        console.log('SIMULATE QUERY');
      }

      return Promise.resolve(text);
      // example of usage:
      // const result = await database.query('SELECT NOW()', text);
      // return result.rows[0];
    } catch (e: any) {
      throw new GenericError('Database Error', 'Error performing query');
    }
  }
  return {
    fetch,
  };
}
