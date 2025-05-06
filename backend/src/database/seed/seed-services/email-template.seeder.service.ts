import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import EmailTemplate from '../../../modules/app-shared/entities/email-template.entity';
import EmailTemplateSeedData from '../seed-data/email-template.seed.data';

export default class EmailTemplateSeedService implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(EmailTemplate);

    for (const userData of EmailTemplateSeedData) {
      const existingEmailTemplate = await repository.findOne({
        where: { subject: userData.subject },
      });

      if (!existingEmailTemplate) {
        await repository.insert(userData);
      }
    }
  }
}
