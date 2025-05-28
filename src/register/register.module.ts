import { Module } from '@nestjs/common';
import { RegisterResolver } from './register.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from './register.entity';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { HttpModule } from '@nestjs/axios';
import { NexonApiService } from 'src/nexon/nexonApi.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Register])],
  controllers: [RegisterController],
  providers: [RegisterResolver, RegisterService, NexonApiService],
})
export class RegisterModule {}
