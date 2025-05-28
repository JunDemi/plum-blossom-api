import {
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRegisterDTO } from './register.dto';
import { RegisterService } from './register.service';
import { IBasicInfo, IRegister } from 'src/interface';

// Entry Point
@Controller('/register')
export class RegisterController {
  constructor(readonly registerService: RegisterService) {}

  /** 가입 신청자 조회 */
  @Get()
  getRegisters(): Promise<IRegister[]> {
    return this.registerService.getRegisters();
  }

  /**가입 신청자 단일 조회 */
  @Get('/one')
  getOneRegister(@Query('name') name: string): Promise<IBasicInfo> {
    return this.registerService.getOneRegister(name);
  }

  /**가입 신청자 생성 */
  @Post()
  createRegister(@Body() postData: CreateRegisterDTO) {
    return this.registerService.createRegister(postData);
  }

  // //멤버 삭제
  // @Delete('/:id')
  // deleteRegister(@Param('no') no: number) {
  //   return this.registerService.deleteRegister({
  //     no,
  //   });
  // }
}
