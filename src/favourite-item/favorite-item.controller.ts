import { Controller, Post, Body, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { FavoriteItemService } from './favorite-item.service';
import { CreateFavoriteItemDto } from './favorite-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('favorite-items')
export class FavoriteItemController {
  constructor(private readonly favoriteItemService: FavoriteItemService) {}

  @Post()
  create(@Body() createFavoriteItemDto: CreateFavoriteItemDto) {
    return this.favoriteItemService.create(createFavoriteItemDto);
  }

  @Get()
  findAll() {
    return this.favoriteItemService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteItemService.remove(+id);
  }
}
