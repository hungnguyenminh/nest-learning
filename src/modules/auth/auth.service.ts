import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

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
  constructor(private jwtService: JwtService) {}
  validateUser({ username, password }: AuthDto) {
    const findUser = fakeUsers.find((item) => item.username === username);

    if (!findUser) return null;

    if (findUser.password === password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
}
