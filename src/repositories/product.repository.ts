import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Product, ProductRelations, Picture} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PictureRepository} from './picture.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype._id,
  ProductRelations
> {

  public readonly pictures: HasManyRepositoryFactory<Picture, typeof Product.prototype._id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PictureRepository') protected pictureRepositoryGetter: Getter<PictureRepository>,
  ) {
    super(Product, dataSource);
    this.pictures = this.createHasManyRepositoryFactoryFor('pictures', pictureRepositoryGetter,);
    this.registerInclusionResolver('pictures', this.pictures.inclusionResolver);
  }
}
