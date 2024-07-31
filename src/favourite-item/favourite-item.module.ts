import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteItem } from './favorite-item.entity';
import { FavoriteItemService } from './favorite-item.service';
import { FavoriteItemController } from './favorite-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteItem])],
  providers: [FavoriteItemService],
  controllers: [FavoriteItemController],
})
export class FavoriteItemModule {}
