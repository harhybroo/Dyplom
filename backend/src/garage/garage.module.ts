import { Module } from '@nestjs/common';
import { GarageService } from './garage.service';
import { GarageController } from './garage.controller';
import { GarageEntity } from './entities/garage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [GarageController],
  providers: [GarageService],
  imports: [TypeOrmModule.forFeature([GarageEntity])],
})
export class GarageModule {}
