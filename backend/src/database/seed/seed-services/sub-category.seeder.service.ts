import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import SubCategory from '../../../modules/category/entities/sub-category.entity';
import SubCategorySeedData from '../seed-data/sub-category.seed.data';

export default class SubCategorySeedService implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SubCategory);

    for (const subCategoryData of SubCategorySeedData) {
      const existingSubCategory = await repository.findOne({
        where: { name: subCategoryData.name },
      });

      if (!existingSubCategory) {
        await repository.insert(subCategoryData);
      }
    }
  }
}
