import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ImagesService } from '../services/images.service';
import type { Image } from '../interface/image.interface';

@Controller('images')
export class ImagesController {
    constructor(private imageService: ImagesService) { }

    @Get()
    getAll(): Image[] {
        return this.imageService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): Image {
        return this.imageService.getById(id);
    }
}
