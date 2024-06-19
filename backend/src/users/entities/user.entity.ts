import { CardEntity } from 'src/card/entities/card.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  tel: string;

  @Column()
  password: string;

  @Column('simple-array', { nullable: true })
  favorite: string[];

  @OneToMany(() => CardEntity, (card) => card.id)
  cards: CardEntity[];
}
