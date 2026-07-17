import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

import { IMAGES_MOCK } from '../mocks/images.mock';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from '../../core/aws/s3/s3.service';
import { Repository } from 'typeorm';
import { ImageEntity } from '../entities/image.entity';
import { Image } from '../interface/image.interface';
import { extname } from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class ImagesService {
    private imagesMocks: Image[] = IMAGES_MOCK;
    private readonly logger = new Logger();

    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepository: Repository<ImageEntity>,
        private readonly s3Service: S3Service,
    ) { }

    public getAll(): Image[] {
        return this.imagesMocks;
    }

    public getById(id: string): Image {
        const image = this.imagesMocks.find((image) => image.id === id);

        if (!image) {
            throw new NotFoundException(`Image with id: ${id} was not found.`)
        }

        return image;
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
                key: savedImage.key,
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
