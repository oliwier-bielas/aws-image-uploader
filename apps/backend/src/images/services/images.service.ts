import { Injectable, NotFoundException } from '@nestjs/common';

import { IMAGES_MOCK } from '../mocks/images.mock';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from '../../core/aws/s3/s3.service';
import { Repository } from 'typeorm';
import { ImageEntity } from '../entities/image.entity';
import { Image } from '../interface/image.interface';

@Injectable()
export class ImagesService {
    private imagesMocks: Image[] = IMAGES_MOCK;

    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepository: Repository<ImageEntity>,
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

    public uploadImage(file: Express.Multer.File): void {

    }
}
