import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LocalGuard } from '@/modules/auth/guards/local.guard';
import { JwtGuards } from '@/modules/auth/guards/jwt.guards';
import { Request } from 'express';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private mailService: MailerService,
  ) {}

  @Post('login')
  create(@Body() authDto: AuthDto) {
    const user = this.authService.validateUser(authDto);

    if (!user) {
      throw new HttpException('invalid credential', 401);
    }

    return user;
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
