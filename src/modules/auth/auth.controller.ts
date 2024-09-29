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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
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
}
