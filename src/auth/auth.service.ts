import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, password: hashedPassword });
    return this.userRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { username, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username: user.username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
