import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteItem } from './favorite-item.entity';
import { FavoriteItemService } from './favorite-item.service';
import { FavoriteItemController } from './favorite-item.controller';
import { User } from '../auth/user.entity';
import { Item } from '../items/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteItem,User,Item])],
  providers: [FavoriteItemService],
  controllers: [FavoriteItemController],
})
export class FavoriteItemModule {}
