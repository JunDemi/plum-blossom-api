import { Module } from '@nestjs/common';
import { PlumController } from 'src/plum/controller/plum.controller';
import { PlumService } from 'src/plum/service/plum.service';

@Module({
    controllers: [PlumController],
    providers: [PlumService],
})
export class PlumModule {}
