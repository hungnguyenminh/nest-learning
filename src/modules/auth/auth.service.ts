import { Injectable } from '@nestjs/common';
import { AuthDto, RegisterUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { ResponseHelper } from '@/helpers/responseHelper';

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
    private mailService: MailerService,
    private authRepository: AuthRepository,
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

  async register(registerDto: RegisterUserDto) {
    const { fullName, password, email, phoneNumber, address } = registerDto;

    const findUser = await this.authRepository.findUserByEmail(email);

    console.log('findUser', findUser);

    if (findUser.length === 0) {
      return await this.authRepository.createUser(registerDto);
    }

    return null;
  }
}
