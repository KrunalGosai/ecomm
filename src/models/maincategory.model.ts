import {Entity, model, property, hasMany} from '@loopback/repository';
import {Category} from './category.model';

@model()
export class Maincategory extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Category)
  categories: Category[];

  constructor(data?: Partial<Maincategory>) {
    super(data);
  }
}

export interface MaincategoryRelations {
  // describe navigational properties here
}

export type MaincategoryWithRelations = Maincategory & MaincategoryRelations;
