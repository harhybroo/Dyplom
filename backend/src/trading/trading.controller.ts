import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TradingService } from './trading.service';
import { CreateTradingDto } from './dto/create-trading.dto';
import { UpdateTradingDto } from './dto/update-trading.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('trading')
@Controller('trading')
export class TradingController {
  constructor(private readonly tradingService: TradingService) {}

  @Post()
  create(@Body() createTradingDto: CreateTradingDto) {
    return this.tradingService.create(createTradingDto);
  }

  @Get()
  findAll() {
    return this.tradingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTradingDto: UpdateTradingDto) {
    return this.tradingService.update(+id, updateTradingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradingService.remove(+id);
  }
}
