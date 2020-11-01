import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Maincategory} from '../models';
import {MaincategoryRepository} from '../repositories';

export class MaincategoryController {
  constructor(
    @repository(MaincategoryRepository)
    public maincategoryRepository : MaincategoryRepository,
  ) {}

  @authenticate('jwt')
  @post('/maincategories', {
    responses: {
      '200': {
        description: 'Maincategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(Maincategory)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maincategory, {
            title: 'NewMaincategory',
            exclude: ['_id'],
          }),
        },
      },
    })
    maincategory: Omit<Maincategory, '_id'>,
  ): Promise<Maincategory> {
    return this.maincategoryRepository.create(maincategory);
  }

  @get('/maincategories/count', {
    responses: {
      '200': {
        description: 'Maincategory model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Maincategory) where?: Where<Maincategory>,
  ): Promise<Count> {
    return this.maincategoryRepository.count(where);
  }

  @get('/maincategories', {
    responses: {
      '200': {
        description: 'Array of Maincategory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Maincategory, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Maincategory) filter?: Filter<Maincategory>,
  ): Promise<Maincategory[]> {
    return this.maincategoryRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/maincategories', {
    responses: {
      '200': {
        description: 'Maincategory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maincategory, {partial: true}),
        },
      },
    })
    maincategory: Maincategory,
    @param.where(Maincategory) where?: Where<Maincategory>,
  ): Promise<Count> {
    return this.maincategoryRepository.updateAll(maincategory, where);
  }

  @get('/maincategories/{id}', {
    responses: {
      '200': {
        description: 'Maincategory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Maincategory, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Maincategory, {exclude: 'where'}) filter?: FilterExcludingWhere<Maincategory>
  ): Promise<Maincategory> {
    return this.maincategoryRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/maincategories/{id}', {
    responses: {
      '204': {
        description: 'Maincategory PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maincategory, {partial: true}),
        },
      },
    })
    maincategory: Maincategory,
  ): Promise<void> {
    await this.maincategoryRepository.updateById(id, maincategory);
  }

  @authenticate('jwt')
  @put('/maincategories/{id}', {
    responses: {
      '204': {
        description: 'Maincategory PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() maincategory: Maincategory,
  ): Promise<void> {
    await this.maincategoryRepository.replaceById(id, maincategory);
  }

  @authenticate('jwt')
  @del('/maincategories/{id}', {
    responses: {
      '204': {
        description: 'Maincategory DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.maincategoryRepository.deleteById(id);
  }
}
