import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('placement')
export class PlacementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomAmmount: string;

  @Column('float')
  square: number;

  @Column('float')
  living_square: number;

  @Column('simple-array')
  ammenities: string[];

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  house_number: number;

  @Column()
  apart_number: number;

  @Column()
  flat: number;

  @Column()
  flat_total: number;

  @Column()
  contact_name: string;

  @Column()
  contact_number: string;
}
