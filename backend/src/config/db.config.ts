import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Wish } from '../wishes/entities/wishes.entity';
import { Wishlist } from '../wishlists/entities/wishlists.entity';
import { Offer } from '../offers/entities/offers.entity';

export default (configService: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USERNAME'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [User, Wish, Wishlist, Offer],
    synchronize: configService.get('POSTGRES_SYNCHRONIZE'),
  };
};
