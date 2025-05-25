import { Module } from '@nestjs/common';
import { PlumModule } from './plum/plum.module';
import { AppController } from './app.controller';

@Module({
  imports: [PlumModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
