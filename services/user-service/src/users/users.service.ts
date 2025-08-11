import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { SignupDto } from './dto/signup.dto';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './interfaces/token.interface';
import { comparePassword, hashValue, parseExpirySeconds } from 'src/common/utils';
import { SigninDto } from './dto/signin.dto';
import { config } from 'src/config';

@Injectable()
export class UsersService {
  constructor(
    @Inject(config().usersRepository)
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

      const tokens = await this.generateTokens({ id });
      const hashedRefresh = await hashValue(tokens.refreshToken);
      await this.setCurrentRefreshToken(hashedRefresh, id);

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
      const hashedRefresh = await hashValue(tokens.refreshToken);
      await this.setCurrentRefreshToken(hashedRefresh, user.id);

      return {
        tokens,
      };
    } catch (err) {
      if (err instanceof RpcException) throw err;
      throw new RpcException({ code: status.INTERNAL, message: 'Login failed' });
    }
  }

  private async generateTokens(payload: { id: string }): Promise<Tokens> {
    const accessExp = this.configService.get<string>('JWT_ACCESS_TOKEN_EXP') || '15m';
    const refreshExp = this.configService.get<string>('JWT_REFRESH_TOKEN_EXP') || '7d';

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: 'dskfkdlsfdslfkdslfkds;lfkds;lfk',
      expiresIn: accessExp,
    } as JwtSignOptions);

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: 'hdshfdsfjsdfjsdkfjsdkfajskdlfja',
      expiresIn: refreshExp,
    } as JwtSignOptions);

    return {
      accessToken,
      refreshToken,
    };
  }

  async setCurrentRefreshToken(hashedToken: string, userId: string): Promise<void> {
    await this.usersRepo.update(userId, { currentHashedRefreshToken: hashedToken });
  }

  async validateCredentials(email: string, plainPassword: string): Promise<Partial<UserEntity> | null> {
    const user = await this.usersRepo.createQueryBuilder('user').addSelect('user.password').where('user.email = :email', { email }).getOne();

    if (!user) return null;

    const isMatch = await comparePassword(plainPassword, user.password);
    if (!isMatch) return null;

    return user;
  }

  // async removeRefreshToken(userId: string): Promise<void> {
  //   await this.usersRepo.update(userId, { currentHashedRefreshToken: null });
  // }

  // async isRefreshTokenValid(userId: string, refreshToken: string): Promise<boolean> {
  //   const user = await this.usersRepo.createQueryBuilder('user').addSelect('user.currentHashedRefreshToken').where('user.id = :id', { id: userId }).getOne();

  //   if (!user || !user.currentHashedRefreshToken) return false;
  //   return bcrypt.compare(refreshToken, user.currentHashedRefreshToken);
  // }
}
