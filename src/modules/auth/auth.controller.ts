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
import { SendOtpDto } from '@/modules/temporary-otp/dto/create-temporary-otp.dto';
import { SendOtpEnum } from '@/modules/auth/auth.enum';

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

  @Get('resend-otp/:user_id')
  async sendOtpViaMail(
    @Param('user_id') user_id: string,
    @Res() res: Response,
  ) {
    const mail = await this.authService.sendOtpViaMail(user_id);

    if (mail) {
      return this.response.responseSuccess({
        res: res,
        code: 200,
        data: mail,
        message: 'Gửi OTP thành công',
      });
    }

    return this.response.responseErrors({
      res: res,
      message: 'Người dùng không tồn tại',
    });
  }

  @Post('confirm-otp')
  async confirmOtp(@Body() sendOtpDto: SendOtpDto, @Res() res: Response) {
    const mail = await this.authService.confirmOtp(sendOtpDto);

    if (mail === SendOtpEnum.NOT_FOUND_USER) {
      return this.response.responseErrors({
        res: res,
        message: 'NOT_FOUND_USER!',
      });
    }

    if (mail === SendOtpEnum.EXPRIED) {
      return this.response.responseErrors({
        res: res,
        message: 'EXPRIED!',
      });
    }

    if (mail === SendOtpEnum.WRONG_OTP) {
      return this.response.responseErrors({
        res: res,
        message: 'WRONG_OTP!',
      });
    }

    return this.response.responseSuccess({
      res: res,
      code: 200,
      data: mail,
      message: 'Gửi OTP thành công',
    });
  }
}
