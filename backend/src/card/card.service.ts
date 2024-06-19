import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from './entities/card.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from 'src/files/entities/file.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private repository: Repository<CardEntity>,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  create(dto: CreateCardDto): Promise<CardEntity> {
    const { title, desc, price, status } = dto;
    const newTask = new CardEntity();
    newTask.title = title;
    newTask.desc = desc;
    newTask.price = price;
    newTask.status = status;

    return this.repository.save(newTask);
  }

  async findAll(): Promise<CardEntity[]> {
    const cards = await this.repository
      .createQueryBuilder('card')
      .leftJoinAndSelect('card.placement', 'placement')
      .leftJoinAndSelect('card.office', 'office')
      .leftJoinAndSelect('card.garage', 'garage')
      .leftJoinAndSelect('card.trading', 'trading')
      .leftJoinAndSelect('card.storage', 'storage')
      .where('card.status != :status', { status: 'review' })
      .getMany();

    for (const card of cards) {
      const images = await this.fileRepository.find({
        where: { card: { id: card.id } },
      });
      card.img = images;
    }

    return cards;
  }
  async findReview(): Promise<CardEntity[]> {
    const cards = await this.repository
      .createQueryBuilder('card')
      .leftJoinAndSelect('card.placement', 'placement')
      .leftJoinAndSelect('card.office', 'office')
      .leftJoinAndSelect('card.garage', 'garage')
      .leftJoinAndSelect('card.trading', 'trading')
      .leftJoinAndSelect('card.storage', 'storage')
      .where('card.status = :status', { status: 'review' })
      .getMany();

    for (const card of cards) {
      const images = await this.fileRepository.find({
        where: { card: { id: card.id } },
      });
      card.img = images;
    }

    return cards;
  }

  async findOne(id: number): Promise<CardEntity> {
    const card = await this.repository
      .createQueryBuilder('card')
      .leftJoinAndSelect('card.placement', 'placement')
      .leftJoinAndSelect('card.office', 'office')
      .leftJoinAndSelect('card.garage', 'garage')
      .leftJoinAndSelect('card.trading', 'trading')
      .leftJoinAndSelect('card.storage', 'storage')
      .where('card.id = :id', { id })
      .getOne();

    if (!card) {
      throw new Error('Card not found');
    }

    const images = await this.fileRepository.find({ where: { card: { id } } });

    card.img = images;

    return card;
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const list = await this.repository.findOneBy({ id });

    if (!list) {
      throw new NotFoundException(`list with id ${id} not found.`);
    }
    Object.assign(list, updateCardDto);

    return this.repository.save(list);
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
