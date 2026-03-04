import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { resolve } from 'path';
import { AuthModule } from './Auth/auth.module';
import { DashboardModule } from './Dashboard/dashboard.module';
import { SellerModule } from './Seller/seller.module';
import { UserModule } from './User/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:resolve('./.env')
    }
    ),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    MongooseModule.forRoot(process.env.DB_URL as string),
    AuthModule,
    UserModule,
    DashboardModule,
    SellerModule,
  ],
  controllers: [],
  providers: [ {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },],
})
export class AppModule {}
