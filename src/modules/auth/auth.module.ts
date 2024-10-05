import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@/modules/auth/strategies/local.strategy';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseHelper } from '@/helpers/responseHelper';
import { TemporaryOtpRepository } from '@/modules/temporary-otp/temporary-otp.repository';
import { TemporaryOtpEntity } from '@/modules/temporary-otp/entities/temporary-otp.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secret-auth-jwt',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forFeature([UserEntity, TemporaryOtpEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthRepository,
    ResponseHelper,
    TemporaryOtpRepository,
  ],
})
export class AuthModule {}
