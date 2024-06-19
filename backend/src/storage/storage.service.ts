import { Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { StorageEntity } from './entities/storage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(StorageEntity)
    private repository: Repository<StorageEntity>,
  ) {}
  create(dto: CreateStorageDto) {
    const {
      square,
      ammenities,
      city,
      street,
      house_number,
      contact_name,
      contact_number,
    } = dto;
    const newStorage = new StorageEntity();
    newStorage.square = square;
    newStorage.city = city;
    newStorage.street = street;
    newStorage.ammenities = ammenities;
    newStorage.house_number = house_number;

    newStorage.contact_name = contact_name;
    newStorage.contact_number = contact_number;
    return this.repository.save(newStorage);
  }

  findAll() {
    return `This action returns all storage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storage`;
  }

  update(id: number, updateStorageDto: UpdateStorageDto) {
    return `This action updates a #${id} storage`;
  }

  remove(id: number) {
    return `This action removes a #${id} storage`;
  }
}
