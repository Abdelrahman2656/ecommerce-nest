import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './User/user.module';
import { DashboardModule } from './Dashboard/dashboard.module';
import { SellerModule } from './Seller/seller.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL as string),
    AuthModule,
    UserModule,
    DashboardModule,
    SellerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
