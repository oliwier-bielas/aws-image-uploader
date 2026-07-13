import { Injectable, NotFoundException } from '@nestjs/common';
import { Image } from '../interface/image.interface';
import { IMAGES_MOCK } from '../mocks/images.mock';

@Injectable()
export class ImagesService {
    private imagesMocks: Image[] = IMAGES_MOCK;

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
}
