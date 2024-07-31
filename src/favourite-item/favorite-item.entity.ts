import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class FavoriteItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemId: number;

  @ManyToOne(() => User, (user) => user.favoriteItems)
  user: User;
}
