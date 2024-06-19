import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { StorageEntity } from './entities/storage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [StorageController],
  providers: [StorageService],
  imports: [TypeOrmModule.forFeature([StorageEntity])],
})
export class StorageModule {}
