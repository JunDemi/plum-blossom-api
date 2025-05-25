import { Module } from '@nestjs/common';
import { PlumController } from './controller/plum.controller';
import { PlumService } from './service/plum.service';

@Module({
    controllers: [PlumController],
    providers: [PlumService],
})
export class PlumModule {}
