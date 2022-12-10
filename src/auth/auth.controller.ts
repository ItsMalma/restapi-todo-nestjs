import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Payload } from 'src/shared/payload';
import { AuthService } from './auth.service';
import { SigninDTO } from './dtos/signin.dto';
import { SignupDTO } from './dtos/signup.dto';

@Controller({ path: 'auth' })
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDTO: SignupDTO) {
    return new Payload(
      HttpStatus.CREATED,
      await this.authService.signup(signupDTO),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() signinDTO: SigninDTO) {
    return new Payload(HttpStatus.OK, await this.authService.signin(signinDTO));
  }
}
