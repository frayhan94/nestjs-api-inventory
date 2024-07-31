import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './items/item.module';
import { FavoriteItemModule } from './favourite-item/favourite-item.module';
import { User } from './auth/user.entity';
import { Item } from './items/item.entity';
import { FavoriteItem } from './favourite-item/favorite-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the config module globally available
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DATABASE_TYPE') as any,
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, FavoriteItem, Item],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ItemModule,
    FavoriteItemModule,
  ],
})
export class AppModule {}
