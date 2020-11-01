import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Maincategory, MaincategoryRelations, Category} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CategoryRepository} from './category.repository';

export class MaincategoryRepository extends DefaultCrudRepository<
  Maincategory,
  typeof Maincategory.prototype._id,
  MaincategoryRelations
> {

  public readonly categories: HasManyRepositoryFactory<Category, typeof Maincategory.prototype._id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Maincategory, dataSource);
    this.categories = this.createHasManyRepositoryFactoryFor('categories', categoryRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
  }
}
