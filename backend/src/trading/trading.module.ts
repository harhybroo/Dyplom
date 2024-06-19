import { Module } from '@nestjs/common';
import { TradingService } from './trading.service';
import { TradingController } from './trading.controller';
import { TradingEntity } from './entities/trading.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TradingController],
  providers: [TradingService],
  imports: [TypeOrmModule.forFeature([TradingEntity])],
})
export class TradingModule {}
