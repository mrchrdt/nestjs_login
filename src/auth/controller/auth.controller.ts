import { Controller, Request, UseGuards, Post, Get } from '@nestjs/common';
import { AuthService } from './../auth.service';
import { LocalAuthGuard } from './../guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
