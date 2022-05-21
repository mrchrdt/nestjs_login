import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { NotFoundInterceptor } from 'src/helpers/interceptors/not-found.interceptor';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserService } from '../user.service';

const entity = 'user';

@Controller(entity)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createUser(@Body() user: User): Observable<User> {
    return this.userService.createUser(user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  updateUser(
    @Param('id') id: string,
    @Body() user: User,
  ): Observable<UpdateResult> {
    return this.userService.updateUser(id, user);
  }

  @Put('resetpassword/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  resetPassword(@Param('id') id: string, @Body() req: any) {
    return this.userService.resetPassword(id, req.password);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  getUser(@Param('id') id: string): Observable<User> {
    return this.userService.findById(id);
  }

  @Get()
  getAllUsers(): Observable<User[]> {
    return from(this.userService.findUsers());
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') id: string): Observable<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
