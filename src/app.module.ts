import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './items/item.module';
import { FavoriteItemModule } from './favourite-item/favourite-item.module';
import { User } from './auth/user.entity';
import { Item } from './items/item.entity';
import { FavoriteItem } from './favourite-item/favorite-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'inventory',
      entities: [User,FavoriteItem, Item],
      synchronize: true,
    }),
    AuthModule,
    ItemModule,
    FavoriteItemModule
  ],
})
export class AppModule {}
