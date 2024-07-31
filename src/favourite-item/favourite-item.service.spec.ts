import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteItemService } from './favorite-item.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteItem } from './favorite-item.entity';
import { User } from '../auth/user.entity';
import { Item } from '../items/item.entity';

const mockFavoriteItemRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
});

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

const mockItemRepository = () => ({
  findOne: jest.fn(),
});

describe('FavoriteItemService', () => {
  let service: FavoriteItemService;
  let favoriteItemRepository;
  let userRepository;
  let itemRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoriteItemService,
        {
          provide: getRepositoryToken(FavoriteItem),
          useFactory: mockFavoriteItemRepository,
        },
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Item),
          useFactory: mockItemRepository,
        },
      ],
    }).compile();

    service = module.get<FavoriteItemService>(FavoriteItemService);
    favoriteItemRepository = module.get<Repository<FavoriteItem>>(getRepositoryToken(FavoriteItem));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });

  describe('create', () => {
    it('should create and return a favorite item', async () => {
      const createFavoriteItemDto = { userId: 1, itemId: 1 };
      const user = { id: 1, username: 'testuser' };
      const item = { id: 1, name: 'testitem' };
      const favoriteItem = { id: 1, user, item };

      userRepository.findOne.mockResolvedValue(user);
      itemRepository.findOne.mockResolvedValue(item);
      favoriteItemRepository.create.mockReturnValue(favoriteItem);
      favoriteItemRepository.save.mockResolvedValue(favoriteItem);

      expect(await service.create(createFavoriteItemDto)).toEqual(favoriteItem);
    });

    it('should throw an error if user is not found', async () => {
      const createFavoriteItemDto = { userId: 1, itemId: 1 };
      userRepository.findOne.mockResolvedValue(null);

      await expect(service.create(createFavoriteItemDto)).rejects.toThrow('User not found');
    });

    it('should throw an error if item is not found', async () => {
      const createFavoriteItemDto = { userId: 1, itemId: 1 };
      const user = { id: 1, username: 'testuser' };

      userRepository.findOne.mockResolvedValue(user);
      itemRepository.findOne.mockResolvedValue(null);

      await expect(service.create(createFavoriteItemDto)).rejects.toThrow('Item not found');
    });
  });

  describe('findAll', () => {
    it('should return all favorite items', async () => {
      const favoriteItems = [{ id: 1, user: { id: 1 }, item: { id: 1 } }];
      favoriteItemRepository.find.mockResolvedValue(favoriteItems);

      expect(await service.findAll()).toEqual(favoriteItems);
    });
  });

  describe('remove', () => {
    it('should delete a favorite item', async () => {
      favoriteItemRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(favoriteItemRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
