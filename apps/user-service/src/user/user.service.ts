// user.service.ts
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<Partial<User>> {
    const { email, username, phoneNumber } = signupDto;

    const existingUser = await this.userRepo.findOne({
      where: [{ email }, { username }, { phoneNumber }],
    });

    if (existingUser) {
      throw new BadRequestException('User with given email, username or phone number already exists');
    }

    const user = this.userRepo.create(signupDto);

    const savedUser = await this.userRepo.save(user);

    const { password, ...safeUser } = savedUser;
    return safeUser;
  }

  async signin(signinDto: SigninDto): Promise<{ accessToken: string }> {
    const { email, password } = signinDto;

    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync(
      { sub: user.id },
      {
        secret: process.env.JWT_SECRET || 'fallback-secret',
        expiresIn: '1h',
      },
    );

    return { accessToken };
  }
}
