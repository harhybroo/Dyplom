import { Injectable } from '@nestjs/common';
import { CreateTradingDto } from './dto/create-trading.dto';
import { UpdateTradingDto } from './dto/update-trading.dto';
import { TradingEntity } from './entities/trading.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TradingService {
  constructor(
    @InjectRepository(TradingEntity)
    private repository: Repository<TradingEntity>,
  ) {}
  create(dto: CreateTradingDto) {
    const {
      square,
      ammenities,
      city,
      street,
      house_number,
      flat,
      flat_total,
      contact_name,
      contact_number,
    } = dto;
    const newTrading = new TradingEntity();
    newTrading.square = square;
    newTrading.city = city;
    newTrading.street = street;
    newTrading.ammenities = ammenities;
    newTrading.house_number = house_number;
    newTrading.flat = flat;
    newTrading.flat_total = flat_total;
    newTrading.contact_name = contact_name;
    newTrading.contact_number = contact_number;
    return this.repository.save(newTrading);
  }

  findAll() {
    return `This action returns all trading`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trading`;
  }

  update(id: number, updateTradingDto: UpdateTradingDto) {
    return `This action updates a #${id} trading`;
  }

  remove(id: number) {
    return `This action removes a #${id} trading`;
  }
}
