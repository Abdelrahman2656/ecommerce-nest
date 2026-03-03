import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDTO, SignUpDTO } from './dto';

@Controller('auth')
export class AuthController {
  //constructor
  constructor(private readonly authService: AuthService) {}
  //method
  @Post('signup')
  async signup(@Body() signupDTO: SignUpDTO) {
    const userCreated = await this.authService.signUpService(signupDTO);
    return { message: 'done', data: userCreated };
  }
  //sign in
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const login = await this.authService.login(loginDTO);
    return {message:'done', login}
  }
}
