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
import {Roles} from '../models';
import {RolesRepository} from '../repositories';

export class RoleController {
  constructor(
    @repository(RolesRepository)
    public rolesRepository : RolesRepository,
  ) {}

  @post('/roles', {
    responses: {
      '200': {
        description: 'Roles model instance',
        content: {'application/json': {schema: getModelSchemaRef(Roles)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {
            title: 'NewRoles',
            exclude: ['id'],
          }),
        },
      },
    })
    roles: Omit<Roles, 'id'>,
  ): Promise<Roles> {
    return this.rolesRepository.create(roles);
  }

  @get('/roles', {
    responses: {
      '200': {
        description: 'Array of Roles model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Roles, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Roles) filter?: Filter<Roles>,
  ): Promise<Roles[]> {
    return this.rolesRepository.find(filter);
  }

  @get('/roles/{id}', {
    responses: {
      '200': {
        description: 'Roles model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Roles, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Roles, {exclude: 'where'}) filter?: FilterExcludingWhere<Roles>
  ): Promise<Roles> {
    return this.rolesRepository.findById(id, filter);
  }

  @patch('/roles/{id}', {
    responses: {
      '204': {
        description: 'Roles PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {partial: true}),
        },
      },
    })
    roles: Roles,
  ): Promise<void> {
    await this.rolesRepository.updateById(id, roles);
  }

  @del('/roles/{id}', {
    responses: {
      '204': {
        description: 'Roles DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rolesRepository.deleteById(id);
  }
}