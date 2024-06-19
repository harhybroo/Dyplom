import { Injectable } from '@nestjs/common';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { UpdatePlacementDto } from './dto/update-placement.dto';
import { PlacementEntity } from './entities/placement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlacementService {
  constructor(
    @InjectRepository(PlacementEntity)
    private repository: Repository<PlacementEntity>,
  ) {}
  create(dto: CreatePlacementDto) {
    const {
      roomAmmount,
      square,
      living_square,
      ammenities,
      city,
      street,
      house_number,
      apart_number,
      flat,
      flat_total,
      contact_name,
      contact_number,
    } = dto;
    const newPlacement = new PlacementEntity();
    newPlacement.roomAmmount = roomAmmount;
    newPlacement.square = square;
    newPlacement.living_square = living_square;
    newPlacement.city = city;
    newPlacement.street = street;
    newPlacement.ammenities = ammenities;
    newPlacement.house_number = house_number;
    newPlacement.apart_number = apart_number;
    newPlacement.flat = flat;
    newPlacement.flat_total = flat_total;
    newPlacement.contact_name = contact_name;
    newPlacement.contact_number = contact_number;
    return this.repository.save(newPlacement);
  }

  findAll() {
    return `This action returns all placement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} placement`;
  }

  update(id: number, updatePlacementDto: UpdatePlacementDto) {
    return `This action updates a #${id} placement`;
  }

  remove(id: number) {
    return `This action removes a #${id} placement`;
  }
}
