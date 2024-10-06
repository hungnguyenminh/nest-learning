import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RegisterUserDto } from './dto/auth.dto';
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
      return this.response.responseSuccess({
        res: res,
        data: register,
        message: 'done',
      });
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

  @Get('mail/:user_id')
  async testMail(@Param('user_id') user_id: string, @Res() res: Response) {
    const mail = await this.authService.sendMail(user_id);

    if (mail) {
      return this.response.responseSuccess({
        res: res,
        code: 200,
        data: null,
        message: 'Gửi OTP thành công',
      });
    }

    return this.response.responseErrors({
      res: res,
      message: 'Người dùng không tồn tại',
    });
  }
}
