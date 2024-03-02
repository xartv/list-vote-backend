import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';
import { Response } from 'express';
import {
  EXEPTION_MSG_INVALID_REFRESH_TOKEN,
  EXPIRE_DAY_REFRESH_TOKEN,
  REFRESH_TOKEN_NAME,
  SET_COOKIE_OPTIONS,
} from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(dto: AuthDto) {
    const { password, ...user } = await this.validateUser(dto);

    const tokens = this.issueToken(user.id);

    return {
      user,
      ...tokens,
    };
  }

  async register(dto: AuthDto) {
    const existedUser = await this.userService.getByEmail(dto.email);

    if (existedUser) throw new BadRequestException('User already exists');

    const { password, ...user } = await this.userService.create(dto);

    const tokens = this.issueToken(user.id);

    return { user, ...tokens };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(REFRESH_TOKEN_NAME, refreshToken, {
      ...SET_COOKIE_OPTIONS,
      expires: expiresIn,
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(REFRESH_TOKEN_NAME, '', {
      ...SET_COOKIE_OPTIONS,
      expires: new Date(0),
    });
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwtService.verifyAsync(refreshToken);

    if (!result)
      throw new UnauthorizedException(EXEPTION_MSG_INVALID_REFRESH_TOKEN);

    const { password, ...user } = await this.userService.getById(result.id);

    const tokens = this.issueToken(user.id);

    return {
      user,
      ...tokens,
    };
  }

  private issueToken(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwtService.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(data, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }
}
