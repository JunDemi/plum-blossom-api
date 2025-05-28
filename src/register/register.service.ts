import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Register } from './register.entity';
import { Repository } from 'typeorm';
import { CreateRegisterDTO } from './register.dto';
import { NexonApiService } from 'src/nexon/nexonApi.service';
import { IBasicInfo, IRegister } from 'src/interface';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Register)
    private readonly registerRepo: Repository<Register>,
    private readonly nexonApiService: NexonApiService,
  ) {}

  //가입 신청자 목록 조회
  async getRegisters(): Promise<IRegister[]> {
    const dbHostData = await this.registerRepo.find({
      order: {
        no: 'ASC',
      },
      select: {
        no: true,
        name: true,
        question: true,
        otherQuestion: true,
        createdAt: true,
      },
    });

    // OCID 추가하여 반환하기
    const resultData: IRegister[] = await Promise.all(
      dbHostData.map(async (item) => {
        //ocid -> basicInfo
        const ocid = await this.nexonApiService.getOcidByName(item.name);
        const basicInfo = await this.nexonApiService.getBasicInfoByOcid(
          ocid || '',
        );

        return {
          ...item,
          basicInfo: basicInfo,
        };
      }),
    );
    return resultData;
  }

  //가입 신청자 단일 조회
  async getOneRegister(name: string): Promise<IBasicInfo> {
    //ocid -> basicInfo
    const ocid = await this.nexonApiService.getOcidByName(name);
    if (!ocid) {
      throw new NotFoundException(`OCID for ${name} not found`);
    } else {
      const basicInfo = await this.nexonApiService.getBasicInfoByOcid(ocid);
      const resultData: IBasicInfo | null = basicInfo;

      if (!resultData) {
        throw new NotFoundException(`Basic info for ${name} not found`);
      }
      return resultData;
    }
  }

  //가입 신청자 생성
  createRegister(createRegisterDTO: CreateRegisterDTO) {
    const newRegister = this.registerRepo.create(createRegisterDTO);
    return this.registerRepo.save(newRegister);
  }

  // //멤버 삭제
  // deleteRegister({ no }: DeleteRegisterDTO) {
  //   return this.registerRepo.delete(no);
  // }
}
