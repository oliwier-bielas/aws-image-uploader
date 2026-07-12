import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from './controllers/images.controller';
import { Image } from './entities/image.entity';
import { ImagesService } from './services/images.service';
@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [TypeOrmModule.forFeature([Image])],
})
export class ImagesModule { }
