import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { DetailOutputUserDTO } from 'src/user/dtos/detail-output-user.dto';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { JWTDTO } from './dtos/jwt.dto';
import { SigninDTO } from './dtos/signin.dto';
import { SignupDTO } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async signup(signupDTO: SignupDTO): Promise<DetailOutputUserDTO> {
    return await this.userService.createUser(signupDTO);
  }

  public async signin(signinDTO: SigninDTO): Promise<JWTDTO> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { email: signinDTO.email },
      });
      if (!compareSync(signinDTO.password, user.password))
        throw new UnauthorizedException(`invalid email or password`);
      return {
        access: this.jwtService.sign(
          { id: user.id },
          { jwtid: 'access', expiresIn: 900 },
        ),
      };
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new UnauthorizedException(`invalid email or password`);
      }
      throw err;
    }
  }
}
