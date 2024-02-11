import 'koa-body';
import Joi from 'joi';
import { Context } from 'koa';
import BadRequest from './bad-request';

const isJoiSchema = (
  schema: Joi.SchemaMap | Joi.Schema,
): schema is Joi.Schema => Joi.isSchema(schema);

type ValidateSchemaMap = {
  body?: Joi.SchemaMap | Joi.Schema;
  query?: Joi.SchemaMap | Joi.Schema;
  params?: Joi.SchemaMap | Joi.Schema;
};

export type ValidateSchema = ValidateSchemaMap & {
  joiOptions?: Joi.ValidationOptions;
};

export default function koaJoiValidate({
  joiOptions = {},
  ...schemas
}: ValidateSchema) {
  const options = { allowUnknown: true, ...joiOptions };

  return async (ctx: Context, next: any) => {
    const schemaKeys = Object.keys(schemas);

    schemaKeys.forEach((schemaKey) => {
      const toValidateObj =
        schemaKey === 'body' ? ctx.request.body : ctx[schemaKey];
      const schema: any = schemas[schemaKey];

      let usableSchema: Joi.Schema;
      if (!isJoiSchema(schema)) {
        usableSchema = Joi.object(schema);
      } else {
        usableSchema = schema;
      }
      const result = usableSchema.validate(toValidateObj, options);

      if (result.error) {
        throw new BadRequest(
          'BadRequest',
          result.error.details.map((detail) => detail.message).join(', '),
        );
      }
    });

    await next();
  };
}
