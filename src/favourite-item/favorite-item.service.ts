import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteItem } from './favorite-item.entity';
import { CreateFavoriteItemDto } from './favorite-item.dto';

@Injectable()
export class FavoriteItemService {
  constructor(
    @InjectRepository(FavoriteItem)
    private favoriteItemRepository: Repository<FavoriteItem>,
  ) {}

  create(createFavoriteItemDto: CreateFavoriteItemDto): Promise<FavoriteItem> {
    const favoriteItem = this.favoriteItemRepository.create(createFavoriteItemDto);
    return this.favoriteItemRepository.save(favoriteItem);
  }

  findAll(): Promise<FavoriteItem[]> {
    return this.favoriteItemRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.favoriteItemRepository.delete(id);
  }
}
