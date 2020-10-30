import {DefaultCrudRepository} from '@loopback/repository';
import {Picture, PictureRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PictureRepository extends DefaultCrudRepository<
  Picture,
  typeof Picture.prototype._id,
  PictureRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Picture, dataSource);
  }
}
