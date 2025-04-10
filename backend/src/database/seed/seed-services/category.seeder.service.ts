import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import Category from '../../../modules/category/entities/category.entity';
import ServiceSeedData from '../seed-data/category.seed.data';

export default class CategorySeedService implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Category);

    for (const serviceData of ServiceSeedData) {
      const existingService = await repository.findOne({
        where: { name: serviceData.name },
      });

      if (!existingService) {
        await repository.insert(serviceData);
      }
    }
  }
}
