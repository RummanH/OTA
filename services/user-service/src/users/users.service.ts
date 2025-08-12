import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { SignupDto } from '../common/dtos/signup.dto';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens } from '../common/interfaces/token.interface';
import { comparePassword, hashValue, parseExpirySeconds } from 'src/common/utils';
import { SigninDto } from '../common/dtos/signin.dto';
import { JWT_ACCESS_SECRET, JWT_ACCESS_TOKEN_EXP, JWT_REFRESH_SECRET, JWT_REFRESH_TOKEN_EXP, USER_REPOSITORY } from 'src/common/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private usersRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(signupData: SignupDto) {
    try {
      const isUserExist = await this.usersRepo.findOne({ where: { email: signupData.email } });
      if (isUserExist) {
        throw new RpcException({ code: status.ALREADY_EXISTS, message: 'Email already exists' });
      }

      const { id } = await this.usersRepo.save(this.usersRepo.create(signupData));

  

      return {
        tokens,
      };
    } catch (err) {
      if (err instanceof RpcException) throw err;
      throw new RpcException({ code: status.INTERNAL, message: 'Signup failed' });
    }
  }

  async login(data: SigninDto) {
    try {
      const user = await this.validateCredentials(data.email, data.password);
      if (!user?.id) {
        throw new RpcException({ code: status.INVALID_ARGUMENT, message: 'Invalid credentials' });
      }

      const tokens = await this.generateTokens({ id: user.id });

      return {
        tokens,
      };
    } catch (err) {
      if (err instanceof RpcException) throw err;
      throw new RpcException({ code: status.INTERNAL, message: 'Login failed' });
    }
  }

  private async generateTokens(payload: { id: string }): Promise<Tokens> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: JWT_ACCESS_SECRET,
      expiresIn: JWT_ACCESS_TOKEN_EXP,
    } as JwtSignOptions);

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: JWT_REFRESH_SECRET,
      expiresIn: JWT_REFRESH_TOKEN_EXP,
    } as JwtSignOptions);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async issueTokens(payload: { id: string }) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: JWT_ACCESS_SECRET,
      expiresIn: JWT_ACCESS_TOKEN_EXP,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: JWT_REFRESH_SECRET,
      expiresIn: JWT_REFRESH_TOKEN_EXP,
    });

    await this.usersRepo.update(payload.id, { currentHashedRefreshToken: await hashValue(refreshToken) });

    return { accessToken, refreshToken };
  }

  async validateCredentials(email: string, plainPassword: string): Promise<Partial<UserEntity> | null> {
    const user = await this.usersRepo.createQueryBuilder('user').addSelect('user.password').where('user.email = :email', { email }).getOne();

    if (!user) return null;

    const isMatch = await comparePassword(plainPassword, user.password);
    if (!isMatch) return null;

    return user;
  }
}
