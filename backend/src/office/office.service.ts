import { Injectable } from '@nestjs/common';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { OfficeEntity } from './entities/office.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OfficeService {
  constructor(
    @InjectRepository(OfficeEntity)
    private repository: Repository<OfficeEntity>,
  ) {}
  create(dto: CreateOfficeDto) {
    const {
      roomAmmount,
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
    const newOffice = new OfficeEntity();
    newOffice.roomAmmount = roomAmmount;
    newOffice.square = square;
    newOffice.city = city;
    newOffice.street = street;
    newOffice.ammenities = ammenities;
    newOffice.house_number = house_number;
    newOffice.flat = flat;
    newOffice.flat_total = flat_total;
    newOffice.contact_name = contact_name;
    newOffice.contact_number = contact_number;
    return this.repository.save(newOffice);
  }

  findAll() {
    return `This action returns all office`;
  }

  findOne(id: number) {
    return `This action returns a #${id} office`;
  }

  update(id: number, updateOfficeDto: UpdateOfficeDto) {
    return `This action updates a #${id} office`;
  }

  remove(id: number) {
    return `This action removes a #${id} office`;
  }
}
