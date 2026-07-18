import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { Repository } from 'typeorm';
import { S3Service } from '../../core/aws/s3/s3.service';
import { ImageEntity } from '../entities/image.entity';
import { Image } from '../interface/image.interface';

@Injectable()
export class ImagesService {
    private readonly logger = new Logger();

    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepository: Repository<ImageEntity>,
        private readonly s3Service: S3Service,
    ) { }

    public async getAllImages(): Promise<Image[]> {
        const images = await this.imageRepository.find();

        return Promise.all(
            images.map(async (image) => ({
                id: image.id,
                fileName: image.fileName,
                key: await this.s3Service.getImageUrl(image.key),
            })),
        );
    }

    public async uploadImage(file: Express.Multer.File): Promise<Image> {
        const key = this.generateImageKey(file.originalname);

        await this.s3Service.uploadFile({
            key,
            buffer: file.buffer,
            contentType: file.mimetype
        });

        try {
            const image = this.imageRepository.create({
                key,
                fileName: file.originalname,
                contentType: file.mimetype,
                size: file.size

            });

            const savedImage = await this.imageRepository.save(image);

            return {
                id: savedImage.id,
                key: await this.s3Service.getImageUrl(image.key),
                fileName: savedImage.fileName
            };

        } catch (error: unknown) {

            await this.rollbackS3Upload(key);

            throw new InternalServerErrorException(
                'Failed to save image metadata', {
                cause: error,
                description: 'Database operation failed',
            });
        }

    }

    private async rollbackS3Upload(key: string): Promise<void> {
        try {
            await this.s3Service.deleteImage(key);
        } catch (error: unknown) {
            this.logger.error(`Failed to rollback S3 upload. Key: ${key}`, error);
        }
    }

    private generateImageKey(originalName: string): string {
        const fileExtension = extname(originalName).toLocaleLowerCase();

        return `images/${randomUUID()}${fileExtension}`
    }
}
