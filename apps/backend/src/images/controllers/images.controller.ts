import { Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImagesService } from '../services/images.service';
import type { Image } from '../interface/image.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';

@Controller('images')
export class ImagesController {
    constructor(private imageService: ImagesService) { }

    @Get()
    public getAll(): Promise<Image[]> {
        return this.imageService.getAllImages();
    }


    @Post()
    @UseInterceptors(FileInterceptor('file'))
    public async uploadImage(
        @UploadedFile() file: Express.Multer.File,
    ): Promise<Image> {
        return this.imageService.uploadImage(file);
    }
}
