import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { UserListModule } from './user-list/user-list.module';
import { ListItemModule } from './list-item/list-item.module';
import { RatingMarkModule } from './rating-mark/rating-mark.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ListModule,
    UserListModule,
    ListItemModule,
    RatingMarkModule,
  ],
})
export class AppModule {}
