import { Injectable } from "@nestjs/common";
import { S3Client } from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class S3Service {
    private readonly s3Client: S3Client;
    private readonly bucketName: string;

    constructor(private readonly configService: ConfigService) {
        const region = this.configService.getOrThrow<string>('AWS_REGION');

        this.bucketName = this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME');

        this.s3Client = new S3Client({
            region,
        });
    }


    
}