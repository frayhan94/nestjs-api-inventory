import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FavoriteItem } from '../favourite-item/favorite-item.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => FavoriteItem, (favoriteItem) => favoriteItem.user)
  favoriteItems: FavoriteItem[];
}
