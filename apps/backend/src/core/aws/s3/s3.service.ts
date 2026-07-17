import { Injectable, Logger, ServiceUnavailableException } from "@nestjs/common";
import { PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
import { S3UploadException } from "../exceptions/s3-upload.exception";
@Injectable()
export class S3Service {
    private readonly s3Client: S3Client;
    private readonly bucketName: string;
    private readonly logger = new Logger();

    constructor(private readonly configService: ConfigService) {
        const region = this.configService.getOrThrow<string>('AWS_REGION');

        this.bucketName = this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME');

        this.s3Client = new S3Client({
            region,
        });
    }

    public async uploadFile(data: {
        key: string,
        buffer: Buffer,
        contentType: string,
    }): Promise<void> {

        const { key, buffer, contentType } = data;

        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: buffer,
            ContentType: contentType,
        });

        try {
            await this.s3Client.send(command);
        } catch (error: unknown) {
            this.logger.error(`Failed to upload file to S3. Key: ${key}`, error);
            throw new S3UploadException(error);
        }
    }

    public async deleteImage(key: string): Promise<void> {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key
        })

        try {
            await this.s3Client.send(command);
        } catch (error: unknown) {
            this.logger.error(`Failed to delete image from S3. Key: ${key}`, error);
            throw new ServiceUnavailableException(
                'Failed to delete image from AWS S3',
            );
        }
    }

}