import { FileEntity } from 'src/files/entities/file.entity';
import { GarageEntity } from 'src/garage/entities/garage.entity';
import { OfficeEntity } from 'src/office/entities/office.entity';
import { PlacementEntity } from 'src/placement/entities/placement.entity';
import { StorageEntity } from 'src/storage/entities/storage.entity';
import { TradingEntity } from 'src/trading/entities/trading.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  price: number;

  @Column()
  status: string;

  @OneToMany(() => FileEntity, (file) => file.card)
  img: FileEntity[];

  @OneToOne(() => FileEntity, { nullable: true })
  @JoinColumn()
  main: FileEntity;

  @OneToOne(() => PlacementEntity, { nullable: true })
  @JoinColumn()
  placement: PlacementEntity;

  @OneToOne(() => OfficeEntity, { nullable: true })
  @JoinColumn()
  office: OfficeEntity;

  @OneToOne(() => GarageEntity, { nullable: true })
  @JoinColumn()
  garage: GarageEntity;

  @OneToOne(() => StorageEntity, { nullable: true })
  @JoinColumn()
  storage: StorageEntity;

  @OneToOne(() => TradingEntity, { nullable: true })
  @JoinColumn()
  trading: TradingEntity;
}
