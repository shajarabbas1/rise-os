import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.getOrThrow<string>('SUPABASE_URL'),
      this.configService.getOrThrow<string>('SUPABASE_KEY'),
    );

    this.bucketName =
      this.configService.get<string>('SUPABASE_BUCKET_NAME') || 'uploads';
  }

  async uploadFile(file: Express.Multer.File, path?: string): Promise<string> {
    try {
      const { data: bucketExists } = await this.supabase.storage.getBucket(
        this.bucketName,
      );

      if (!bucketExists) {
        await this.supabase.storage.createBucket(this.bucketName, {
          public: true,
        });
      }

      const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
      const filePath = path ? `${path}/${fileName}` : fileName;

      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

      if (error) {
        throw new Error(`Failed to upload file: ${error.message}`);
      }
      const {
        data: { publicUrl },
      } = this.supabase.storage.from(this.bucketName).getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }
}
