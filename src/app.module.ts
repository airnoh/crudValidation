import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
     ConfigModule.forRoot(),
     TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory:
        (configService: ConfigService) => ({
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          autoLoadEntities: true,
          synchronize: true,
        }),
      inject: [ConfigService]
    }),

     TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
