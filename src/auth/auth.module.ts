import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { FavoriteItem } from '../favourite-item/favorite-item.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User,FavoriteItem]),
    PassportModule,
    JwtModule.register({
      secret: 'NestJSTest', // Gantilah dengan kunci rahasia Anda
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
