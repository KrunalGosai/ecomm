import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Product,
  Picture,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductPictureController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/pictures', {
    responses: {
      '200': {
        description: 'Array of Product has many Picture',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Picture)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Picture>,
  ): Promise<Picture[]> {
    return this.productRepository.pictures(id).find(filter);
  }

  @authenticate('jwt')
  @post('/products/{id}/pictures', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Picture)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Picture, {
            title: 'NewPictureInProduct',
            exclude: ['_id'],
            optional: ['productId']
          }),
        },
      },
    }) picture: Omit<Picture, '_id'>,
  ): Promise<Picture> {
    return this.productRepository.pictures(id).create(picture);
  }

  @authenticate('jwt')
  @patch('/products/{id}/pictures', {
    responses: {
      '200': {
        description: 'Product.Picture PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Picture, {partial: true}),
        },
      },
    })
    picture: Partial<Picture>,
    @param.query.object('where', getWhereSchemaFor(Picture)) where?: Where<Picture>,
  ): Promise<Count> {
    return this.productRepository.pictures(id).patch(picture, where);
  }

  @authenticate('jwt')
  @del('/products/{id}/pictures', {
    responses: {
      '200': {
        description: 'Product.Picture DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Picture)) where?: Where<Picture>,
  ): Promise<Count> {
    return this.productRepository.pictures(id).delete(where);
  }
}
