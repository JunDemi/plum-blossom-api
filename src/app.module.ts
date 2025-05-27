import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { MemberModule } from './member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MemberEntity } from './member/member.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 환경변수 설정을 전역으로 사용
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test', // 환경변수 파일 경로
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
      entities: [MemberEntity]
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    MemberModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
