import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('new')
  createUser(@Body() userDto: CreateUserDto) {
      return this.authService.createUser(userDto);
  }

  @Post()
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @UseGuards(AuthGuard)
  @Get('renew')
  renewToken(@Request() req: any) {
    return this.authService.renewToken(req)
    
  }
}
