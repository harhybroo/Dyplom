import { Module } from '@nestjs/common';
import { OfficeService } from './office.service';
import { OfficeController } from './office.controller';
import { OfficeEntity } from './entities/office.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [OfficeController],
  providers: [OfficeService],
  imports: [TypeOrmModule.forFeature([OfficeEntity])],
})
export class OfficeModule {}
