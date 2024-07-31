import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto, UpdateItemDto } from './item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  findOne(id: number): Promise<Item> {
    return this.itemRepository.findOne({ where: { id } });
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    await this.itemRepository.update(id, updateItemDto);
    return this.itemRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
