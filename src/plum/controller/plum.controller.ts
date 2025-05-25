import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PlumService } from 'src/plum/service/plum.service';
import { CreatePlumDto, UpdatePlumDto } from 'src/plum/service/plum.dto';
import { IPlum } from 'src/plum/service/plum.interfaces';

// Entry Point
@Controller('/plum')
export class PlumController {
  constructor(readonly plumService: PlumService) {}

  //전체 조회
  @Get()
  getAll(): IPlum[] {
    return this.plumService.getAll();
  }

  //   @Get('/search')
  //   search(@Query('year') year: string) {
  //     return `We are searching title ${year}`;
  //   }

  // 상세 조회
  @Get('/:id')
  getOne(@Param('id') id: number): IPlum {
    return this.plumService.getOne(id);
  }

  // 생성
  @Post()
  createOne(@Body() postData: CreatePlumDto) {
    return this.plumService.createOne(postData);
  }

  // 삭제
  @Delete('/:id')
  deleteOne(@Param('id') id: number) {
    return this.plumService.deleteOne(id);
  }

  // 수정
  @Patch('/:id')
  updateOne(@Param('id') id: number, @Body() pathData: UpdatePlumDto) {
    return this.plumService.updateOne(id, pathData);
  }
}
