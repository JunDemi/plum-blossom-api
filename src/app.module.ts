import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { MemberModule } from './member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Member } from './member/member.entity';
import { PlumModule } from './plum/plum.module';
import { RegisterModule } from './register/register.module';
import { Register } from './register/register.entity';
import { HttpModule } from '@nestjs/axios';

const envRecord: Record<string, string> = {
  dev: '.env.dev',
  test: '.env.test',
  prod: '.env.prod',
};

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true, // 환경변수 설정을 전역으로 사용
      envFilePath: envRecord[String(process.env.NODE_ENV)], // 환경변수 파일 경로
      ignoreEnvFile: process.env.NODE_ENV === 'prod', // .env 파일을 무시하지 않음
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: process.env.NODE_ENV !== 'prod',
      entities: [Member, Register],
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    MemberModule,
    RegisterModule,
    PlumModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
