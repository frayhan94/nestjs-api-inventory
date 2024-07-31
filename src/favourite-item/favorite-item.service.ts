import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteItem } from './favorite-item.entity';
import { CreateFavoriteItemDto } from './favorite-item.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class FavoriteItemService {
  constructor(
    @InjectRepository(FavoriteItem)
    private favoriteItemRepository: Repository<FavoriteItem>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createFavoriteItemDto: CreateFavoriteItemDto): Promise<FavoriteItem> {
    const { userId, itemId } = createFavoriteItemDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const favoriteItem = this.favoriteItemRepository.create({ itemId, user });
    return this.favoriteItemRepository.save(favoriteItem);
  }

  findAll(): Promise<FavoriteItem[]> {
    return this.favoriteItemRepository.find({ relations: ['user'] });
  }

  async remove(id: number): Promise<void> {
    await this.favoriteItemRepository.delete(id);
  }
}
