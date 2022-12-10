import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { UserEntity } from 'src/user/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['HS256'],
      issuer: configService.get('JWT_ISSUER'),
      secretOrKey: configService.get('JWT_SECRET'),
    } as StrategyOptions);
  }

  public async validate(payload: { id: number }) {
    return await this.userRepository.findOne({
      where: { id: payload.id },
    });
  }
}
