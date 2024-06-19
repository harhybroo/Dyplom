import { Module } from '@nestjs/common';
import { PlacementService } from './placement.service';
import { PlacementController } from './placement.controller';
import { PlacementEntity } from './entities/placement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PlacementController],
  providers: [PlacementService],
  imports: [TypeOrmModule.forFeature([PlacementEntity])],
})
export class PlacementModule {}
