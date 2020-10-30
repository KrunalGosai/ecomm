import {Entity, model, property, hasMany} from '@loopback/repository';
import {Picture} from './picture.model';

@model()
export class Product extends Entity {
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

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
  })
  saleprice?: number;

  @property({
    type: 'number',
  })
  discount?: number;

  @property({
    type: 'string',
    required: true,
  })
  shortdetails: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  stock: number;

  @property({
    type: 'string',
    required: true,
  })
  brand: string;

  @property({
    type: 'boolean',
    default: false,
  })
  newpro?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  sale?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  categoryname: string;

  @hasMany(() => Picture)
  pictures: Picture[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
