import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigProvider } from './database/DBConfigProvider';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { PointModule } from './point/point.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { ProductCategoryModule } from './product_category/productCategory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
    }),
    TypeOrmModule.forRoot(DBConfigProvider.forRoot()),
    UserModule,
    AuthModule,
    PointModule,
    BoardModule,
    CommentModule,
    ProductModule,
    ProductCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
