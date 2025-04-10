import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import UserSeedData from '../seed-data/user.seed.data';
import User from '../../../modules/user/entities/user.entity';

export default class UserSeedService implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(User);

    for (const userData of UserSeedData) {
      const existingUser = await repository.findOne({
        where: { email: userData.email },
      });

      if (!existingUser) {
        await repository.insert(userData);
      }
    }
  }
}
