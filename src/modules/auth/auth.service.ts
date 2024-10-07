import { Injectable } from '@nestjs/common';
import { AuthDto, RegisterUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { randomBytes } from 'crypto';
import { TemporaryOtpRepository } from '@/modules/temporary-otp/temporary-otp.repository';
import { classToPlain } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { SendOtpDto } from '@/modules/temporary-otp/dto/create-temporary-otp.dto';
import { SendOtpEnum } from '@/modules/auth/auth.enum';

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
    private tmpOtpRepository: TemporaryOtpRepository,
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

  async genRandomRefferCode() {
    const randomCodeRefferCode = randomBytes(4)
      .toString('hex')
      .substring(0, 7)
      .toUpperCase();

    const findUserByRefferCode =
      await this.authRepository.findUserByRefferCode(randomCodeRefferCode);

    if (findUserByRefferCode.length === 0) {
      return randomCodeRefferCode;
    } else await this.genRandomRefferCode();
  }

  async register(
    registerDto: RegisterUserDto,
    admin?: {
      user_id: string;
      referrerCode: string;
      agencyLevel: number;
    },
  ) {
    const { email, agencyCode, agencyLevel } = registerDto;

    const findUser = await this.authRepository.findUserByEmail(email);

    // user đã tồn tại
    if (findUser.length > 0) {
      return null;
    }

    let createUser;

    const randomCodeRefferCode = await this.genRandomRefferCode();

    if (admin) {
      createUser = await this.authRepository.createUser({
        ...registerDto,
        referrerCode: `LF-${randomCodeRefferCode}`,
        agencyCode: admin.referrerCode,
        agencyLevel: admin.agencyLevel + 1,
        isActive: !!agencyCode,
      });
    } else {
      createUser = await this.authRepository.createUser({
        ...registerDto,
        referrerCode: `LF-${randomCodeRefferCode}`,
        agencyCode: agencyCode ?? null,
        agencyLevel: agencyLevel ?? null,
        isActive: !!agencyCode,
      });
    }

    const otp = randomBytes(4).toString('hex').substring(0, 5).toUpperCase();

    await this.tmpOtpRepository.create({
      user_id: createUser.id,
      email: createUser.email,
      name: createUser.fullName,
      otp: otp,
    });

    await this.sendMail({
      email: createUser.email,
      name: createUser.fullName,
      otp: otp,
    });

    return classToPlain(createUser);
  }

  async sendOtpViaMail(user_id: string) {
    if (isNaN(parseInt(user_id, 10))) {
      return null;
    }

    const findOtpTmp = await this.tmpOtpRepository.findOtp(
      parseInt(user_id, 10),
    );

    if (findOtpTmp) {
      await this.sendMail({
        email: findOtpTmp.email,
        name: findOtpTmp.name,
        otp: findOtpTmp.otp,
      });

      return findOtpTmp;
    } else return null;
  }

  async sendMail(data: { email: string; name: string; otp: string }) {
    await this.mailService
      .sendMail({
        to: data.email,
        subject: data.otp,
        text: 'welcome',
        template: 'register',
        context: {
          name: data.name,
          activationCode: data.otp,
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

  async confirmOtp(sendOtpDto: SendOtpDto) {
    const findOtp = await this.tmpOtpRepository.findOtp(sendOtpDto.user_id);

    if (!findOtp) {
      return SendOtpEnum.NOT_FOUND_USER;
    }

    const now = new Date();
    const expireDate = new Date(findOtp.expiresAt);

    if (now.getTime() >= expireDate.getTime()) {
      return SendOtpEnum.EXPRIED;
    }

    if (findOtp.otp === sendOtpDto.otp) {
      const user = await this.authRepository.findUserByEmail(findOtp.email);

      if (user) {
        await this.authRepository.updateUser(sendOtpDto.user_id, {
          isActive: true,
        });

        return sendOtpDto;
      }

      return SendOtpEnum.NOT_FOUND_USER;
    }

    return SendOtpEnum.WRONG_OTP;
  }
}
