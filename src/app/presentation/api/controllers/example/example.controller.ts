import { GET, route } from 'awilix-koa';
import { Context } from 'koa';

interface ServiceType {
  currentUser: any;
}

@route('/(v1)?')
class ExampleController {
  currentUser: any;

  constructor({ currentUser }: ServiceType) {
    this.currentUser = currentUser;
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
  getExample(ctx: Context): Promise<Date> {
    return ctx.ok(true);
  }
}

export default ExampleController;
