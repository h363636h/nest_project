import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DBConfigProvider {
  public static forRoot(): TypeOrmModuleOptions {
    const result: TypeOrmModuleOptions = {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      entities: [__dirname + '/entities/*.js'],
      logging: true,
    };
    //console.log(process.env.IS_REAL);
    //console.log(result);
    return result;
  }
}
