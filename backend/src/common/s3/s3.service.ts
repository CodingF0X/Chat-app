import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileUploadOptions } from './upload-options.interface';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );

    const clientConfig: S3ClientConfig = {};

    if (accessKeyId && secretAccessKey) {
      clientConfig.credentials = {
        accessKeyId,
        secretAccessKey,
      };
    }
    this.s3Client = new S3Client(clientConfig);
  }

  async uploadFile({bucket, key, file}: FileUploadOptions){
    await this.s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file,
      CacheControl: 'no-cache',
    }));
  }

  getObjectUrl(bucket: string, key: string): string {
    return `https://${bucket}.s3.amazonaws.com/${key}`;
  }
}
