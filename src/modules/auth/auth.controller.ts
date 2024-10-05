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
import { AuthDto, RegisterUserDto } from './dto/auth.dto';
import { JwtGuards } from '@/modules/auth/guards/jwt.guards';
import { Request } from 'express';
import { MailerService } from '@nestjs-modules/mailer';
import { ResponseHelper } from '@/helpers/responseHelper';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private mailService: MailerService,
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

    console.log('register', register);

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

  @Get('mail')
  async testMail() {
    await this.mailService
      .sendMail({
        to: 'hungnm.17k2@gmail.com',
        subject: 'Iu em <3',
        text: 'welcome',
        template: 'register',
        context: {
          name: 'name',
          activationCode: 'activationCode',
        },
      })
      .then((e) => {
        console.log('e then', e);
        return {
          status: true,
          message: e,
        };
      })
      .catch((e) => {
        console.log('e catch', e);
        return {
          status: false,
          message: e,
        };
      });
    return 'ok';
  }
}
