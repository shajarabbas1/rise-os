import { Column, Entity } from 'typeorm';
import CustomBaseEntity from '../../../common/infra/base-classes/base.entity';

export enum FileTypeEnum {
  IMAGE = 'IMAGE',
  FILE = 'FILE',
}

@Entity({ name: 'uploaded_files' })
export class UploadedFile extends CustomBaseEntity {
  // Original name of the file
  @Column({ type: 'varchar', length: 255, nullable: true })
  originalName: string;

  // Uploaded file size (in bytes)
  @Column({ type: 'int', nullable: true })
  size: number;

  // File category (e.g., picture, document, etc.)
  @Column({
    type: 'enum',
    enum: FileTypeEnum,
    nullable: false,
  })
  type: FileTypeEnum;

  @Column({ type: 'text', nullable: false })
  fileURL: string;

  @Column({ type: 'text', nullable: false })
  userId: string;
}
