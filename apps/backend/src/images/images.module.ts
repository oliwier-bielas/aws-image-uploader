import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from './controllers/images.controller';
import { ImageEntity } from './entities/image.entity';
import { ImagesService } from './services/images.service';
import { S3Module } from '../core/aws/s3/s3.module';
@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [TypeOrmModule.forFeature([ImageEntity]), S3Module],
})
export class ImagesModule { }
