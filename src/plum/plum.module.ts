import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PlumController } from './plum.controller';
import { PlumService } from './plum.service';
import { NexonApiService } from 'src/nexon/nexonApi.service';

@Module({
    imports: [HttpModule],
    controllers: [PlumController],
    providers: [PlumService, NexonApiService],
})
export class PlumModule {}
