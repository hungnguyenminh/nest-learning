import { Injectable } from '@nestjs/common';
import { AuthDto, RegisterUserDto, SendMailDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { randomBytes } from 'crypto';

const fakeUsers = [
  {
    id: 1,
    username: 'hung',
    password: '1234455',
  },
  {
    id: 1,
    username: 'huyen',
    password: '1234455',
  },
];
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authRepository: AuthRepository,
    private mailService: MailerService,
  ) {}
  validateUser({ username, password }: AuthDto) {
    const findUser = fakeUsers.find((item) => item.username === username);

    if (!findUser) {
      console.log('user not found!');
      return null;
    }

    if (findUser.password === password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }

  async sendMail() {
    const otp = randomBytes(4).toString('hex').substring(0, 5).toUpperCase();

    await this.mailService
      .sendMail({
        to: 'hungnm.17k2@gmail.com',
        subject: otp,
        text: 'welcome',
        template: 'register',
        context: {
          name: 'sss',
          activationCode: otp,
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

  async register(registerDto: RegisterUserDto) {
    const { email, agencyCode, agencyLevel } = registerDto;

    const findUser = await this.authRepository.findUserByEmail(email);

    const randomCodeRefferCode = randomBytes(4)
      .toString('hex')
      .substring(0, 7)
      .toUpperCase();

    const findUserByRefferCode =
      await this.authRepository.findUserByRefferCode(randomCodeRefferCode);

    if (findUser.length === 0 && findUserByRefferCode.length === 0) {
      return await this.authRepository.createUser({
        ...registerDto,
        referrerCode: `LF-${randomCodeRefferCode}`,
        agencyCode: agencyCode ?? null,
        agencyLevel: agencyLevel ?? null,
        isActive: !!agencyCode,
      });
    }

    return null;
  }
}
