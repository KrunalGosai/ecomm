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
  Maincategory,
  Category,
} from '../models';
import {MaincategoryRepository} from '../repositories';

export class MaincategoryCategoryController {
  constructor(
    @repository(MaincategoryRepository) protected maincategoryRepository: MaincategoryRepository,
  ) { }

  @get('/maincategories/{id}/categories', {
    responses: {
      '200': {
        description: 'Array of Maincategory has many Category',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Category)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Category>,
  ): Promise<Category[]> {
    return this.maincategoryRepository.categories(id).find(filter);
  }
  
  @authenticate('jwt')
  @post('/maincategories/{id}/categories', {
    responses: {
      '200': {
        description: 'Maincategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(Category)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Maincategory.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {
            title: 'NewCategoryInMaincategory',
            exclude: ['_id'],
            optional: ['maincategoryId']
          }),
        },
      },
    }) category: Omit<Category, '_id'>,
  ): Promise<Category> {
    return this.maincategoryRepository.categories(id).create(category);
  }

  @authenticate('jwt')
  @patch('/maincategories/{id}/categories', {
    responses: {
      '200': {
        description: 'Maincategory.Category PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {partial: true}),
        },
      },
    })
    category: Partial<Category>,
    @param.query.object('where', getWhereSchemaFor(Category)) where?: Where<Category>,
  ): Promise<Count> {
    return this.maincategoryRepository.categories(id).patch(category, where);
  }

  @authenticate('jwt')
  @del('/maincategories/{id}/categories', {
    responses: {
      '200': {
        description: 'Maincategory.Category DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Category)) where?: Where<Category>,
  ): Promise<Count> {
    return this.maincategoryRepository.categories(id).delete(where);
  }
}
