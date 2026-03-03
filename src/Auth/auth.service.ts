import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'DB/Models/User/user.repository';
import { LoginDTO, SignUpDTO } from './dto';
import { compare, hash, sendEmail } from './common';
import { randomInt } from 'crypto';
import { TUser } from 'DB/Models/User/user.schema';
import { TokenService } from './common/Service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private tokenService: TokenService,
  ) {}
  //signup
  async signUpService(signupDTO: SignUpDTO): Promise<TUser> {
    //get data
    const { name, email, password ,role} = signupDTO;
    //check existence
    const userExistence = await this.userRepository.findByEmail(email);
    if (userExistence) {
      throw new ConflictException('user already exist ');
    }
    //otp
    const otp = randomInt(100000, 999999);
    const userCreated = await this.userRepository.create({
      name,
      email,
      role,
      password: hash(password),
    });
    //send email
    await sendEmail({
      to: email,
      from: process.env.USER_EMAIL,
      subject: 'Confirm Email',
      html: `<p>your OTP is ${otp}</p>`,
    });
    return userCreated;
  }
  //sign in
  async login(loginDTO: LoginDTO): Promise<string> {
    //get data
    const { email, password } = loginDTO;
    //check existence
    const userExistence = await this.userRepository.findByEmail(email);
    if (!userExistence) {
      throw new NotFoundException('User Not Found');
    }
    //compare password
    if (!compare(password, userExistence.password)) {
      throw new UnauthorizedException('Invalid Password');
    }
    //token
    const token = this.tokenService.sign(
      { _id: userExistence._id },
      { secret: process.env.SECRET_KEY, expiresIn: '1h' },
    );
    return token;
  }
}
