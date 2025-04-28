import { DataSourceOptions, DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import DatabaseConfig from '../../config/db.config';

import User from '../../modules/user/entities/user.entity';
import Category from '../../modules/category/entities/category.entity';
import SubCategory from '../../modules/category/entities/sub-category.entity';
import EmailTemplate from '../../modules/app-shared/entities/email-template.entity';
import { Form } from '../../modules/form/entities/form.entity';
import { FormField } from '../../modules/form/entities/form-field.entity';
import { FormSection } from '../../modules/form/entities/form-section.entity';
import UserSubCategory from '../../modules/user-registration/entities/user-sub-category.entity';
import UserCategory from '../../modules/user-registration/entities/user-category.entity';

import UserSeedService from './seed-services/user.seeder.service';
import CategorySeedService from './seed-services/category.seeder.service';
import SubCategorySeedService from './seed-services/sub-category.seeder.service';
import EmailTemplateSeedService from './seed-services/email-template.seeder.service';

export const DataSourceOption: DataSourceOptions & SeederOptions = {
  ...DatabaseConfig(),
  entities: [
    User,
    Category,
    SubCategory,
    Form,
    FormField,
    FormSection,
    EmailTemplate,
    UserCategory,
    UserSubCategory,
  ], // Add all entities here
  seeds: [
    UserSeedService,
    CategorySeedService,
    SubCategorySeedService,
    EmailTemplateSeedService,
  ], // Add all seeder services here
};

const dataSource = new DataSource(DataSourceOption);

export default dataSource;

if (require.main === module) {
  const seederName = process.argv[2];

  dataSource
    .initialize()
    .then(async () => {
      console.log('Seeding started!');

      const seederMap = {
        user: UserSeedService,
        category: CategorySeedService,
        'sub-category': SubCategorySeedService,
        'email-template': EmailTemplateSeedService,
      };

      if (!seederName) {
        console.log('Please provide a seeder name');
        console.log('Available seeders:', Object.keys(seederMap).join(', '));

        await dataSource.destroy();
        return;
      }

      const seederClass = seederMap[seederName.toLowerCase()];

      if (!seederClass) {
        console.error(`No seeder found with name: ${seederName}`);
        console.log('Available seeders:', Object.keys(seederMap).join(', '));
        await dataSource.destroy();
        return;
      }

      const seeder = new seederClass();

      console.log(`Running ${seederName} seeder...`);
      await seeder.run(dataSource);

      console.log('Seeding completed!');
      await dataSource.destroy();
    })
    .catch(error => {
      console.error('Error during Data Source initialization', error);
    });
}
