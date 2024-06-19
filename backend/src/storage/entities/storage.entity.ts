import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('storage')
export class StorageEntity {
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
  contact_name: string;

  @Column()
  contact_number: string;
}
