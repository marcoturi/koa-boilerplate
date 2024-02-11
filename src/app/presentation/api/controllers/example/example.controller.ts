import { GET, route } from 'awilix-koa';
import { Context } from 'koa';
import exampleService from '../../../../core/application/example/example.service';

interface ServiceType {
  exampleService: ReturnType<typeof exampleService>;
}

@route('/(v1)?')
class ExampleController {
  exampleService: ReturnType<typeof exampleService>;

  constructor({ exampleService }: ServiceType) {
    this.exampleService = exampleService;
  }

  /**
   * @swagger
   * /example:
   *  get:
   *    security:
   *      - Bearer: []
   *    tags:
   *      - Example
   *    description:
   *    responses:
   *      200:
   *        description: successful operation
   *        schema: Date
   *      404:
   *        description:
   *        schema:
   *          $ref: '#/definitions/NotFound'
   */
  @route('/example')
  @GET()
  async getExample(ctx: Context): Promise<Date> {
    const result = await this.exampleService.example('example');
    return ctx.ok({ result });
  }
}

export default ExampleController;
