import {Entity, model, property} from '@loopback/repository';

@model()
export class Picture extends Entity {
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
  small: string;

  @property({
    type: 'string',
    required: true,
  })
  big: string;

  @property({
    type: 'string',
  })
  productId?: string;

  constructor(data?: Partial<Picture>) {
    super(data);
  }
}

export interface PictureRelations {
  // describe navigational properties here
}

export type PictureWithRelations = Picture & PictureRelations;
