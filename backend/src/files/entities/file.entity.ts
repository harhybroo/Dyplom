import { CardEntity } from 'src/card/entities/card.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @ManyToOne(() => CardEntity, (placement) => placement.img)
  card: FileEntity;

  @Column()
  originalName: string;

  @Column()
  size: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
