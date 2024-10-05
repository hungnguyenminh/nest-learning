import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RegisterUserDto, SendMailDto } from './dto/auth.dto';
import { JwtGuards } from '@/modules/auth/guards/jwt.guards';
import { Request, Response } from 'express';
import { ResponseHelper } from '@/helpers/responseHelper';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    private readonly response: ResponseHelper,
  ) {}

  @Post('login')
  login(@Body() authDto: AuthDto) {
    const user = this.authService.validateUser(authDto);

    if (!user) {
      throw new HttpException('invalid credential', 401);
    }

    return user;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto, @Res() res: Response) {
    console.log('registerDto', registerDto);

    const register = await this.authService.register(registerDto);

    if (register) {
      return this.response.responseSuccess(res, register);
    }

    return this.response.responseErrors({
      res: res,
      message: 'người dùng đã tồn tại',
    });
  }

  @Get('status')
  @UseGuards(JwtGuards)
  status(@Req() req: Request) {
    console.log('inside get controller');
    console.log('req', req.user);

    return req.user;
  }

  @Post('mail')
  async testMail() {
    await this.authService.sendMail();

    return 'ok';
  }
}
