import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { FindUserDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wish } from '../wishes/entities/wishes.entity';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PasswordUserInterceptor } from '../interceptors/password-user.interceptor';
import { PasswordWishInterceptor } from 'src/interceptors/password-wish.interceptor';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() user) {
    return this.usersService.create(user);
  }

  @UseInterceptors(PasswordUserInterceptor)
  @Get('me')
  async findOne(@Req() { user: { id } }): Promise<User> {
    return await this.usersService.findUserById(id);
  }

  @UseInterceptors(PasswordWishInterceptor)
  @Get('me/wishes')
  async getOwnWishes(@Req() req): Promise<Wish[]> {
    return await this.usersService.getWishes(req.user.id);
  }

  @UseInterceptors(PasswordWishInterceptor)
  @Get(':username/wishes')
  async getWishesByUsername(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    return this.usersService.getWishes(user.id);
  }

  @Patch('me')
  update(@Req() req, @Body() dto: UpdateUserDto) {
    return this.usersService.updateOne(req.user.id, dto);
  }

  @UseInterceptors(PasswordUserInterceptor)
  @Post('find')
  findMany(@Body() dto: FindUserDto) {
    return this.usersService.findMany(dto);
  }
}
