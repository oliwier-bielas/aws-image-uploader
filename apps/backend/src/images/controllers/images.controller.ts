import { Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImagesService } from '../services/images.service';
import type { Image } from '../interface/image.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';

@Controller('images')
export class ImagesController {
    constructor(private imageService: ImagesService) { }

    @Get()
    getAll(): Image[] {
        return this.imageService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: string): Image {
        return this.imageService.getById(id);
    }

    
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    public async uploadImage(
        @UploadedFile() file: Express.Multer.File,
    ): Promise<Image> {
        return this.imageService.uploadImage(file);
    }
}
