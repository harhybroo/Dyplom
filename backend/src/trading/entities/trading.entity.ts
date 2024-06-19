import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trading')
export class TradingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  square: number;

  @Column('simple-array')
  ammenities: string[];

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  house_number: number;

  @Column()
  flat: number;

  @Column()
  flat_total: number;

  @Column()
  contact_name: string;

  @Column()
  contact_number: string;
}
