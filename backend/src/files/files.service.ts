import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { CardEntity } from 'src/card/entities/card.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>,

    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async create(file: Express.Multer.File, cardId: number) {
    const card = await this.cardRepository.findOneBy({ id: cardId });
    if (!card) {
      throw new Error('Карточка не найдена');
    }

    const newFile = this.repository.create({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      card: card,
    });

    return this.repository.save(newFile);
  }
}
