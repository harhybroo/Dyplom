import { Injectable } from '@nestjs/common';
import { CreateGarageDto } from './dto/create-garage.dto';
import { UpdateGarageDto } from './dto/update-garage.dto';
import { GarageEntity } from './entities/garage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GarageService {
  constructor(
    @InjectRepository(GarageEntity)
    private repository: Repository<GarageEntity>,
  ) {}
  create(dto: CreateGarageDto) {
    const {
      square,
      capacity,
      ammenities,
      city,
      street,
      house_number,
      contact_name,
      contact_number,
    } = dto;
    const newGarage = new GarageEntity();
    newGarage.square = square;
    newGarage.city = city;
    newGarage.street = street;
    newGarage.ammenities = ammenities;
    newGarage.house_number = house_number;
    newGarage.capacity = capacity;
    newGarage.contact_name = contact_name;
    newGarage.contact_number = contact_number;
    return this.repository.save(newGarage);
  }

  findAll() {
    return `This action returns all garage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} garage`;
  }

  update(id: number, updateGarageDto: UpdateGarageDto) {
    return `This action updates a #${id} garage`;
  }

  remove(id: number) {
    return `This action removes a #${id} garage`;
  }
}
