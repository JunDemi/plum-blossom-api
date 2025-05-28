import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Register } from './register.entity';
import { CreateRegisterDTO } from './register.dto';
import { RegisterService } from './register.service';

@Resolver((of) => Register)
export class RegisterResolver {
  constructor(private readonly registerService: RegisterService) {}

  //멤버 조회
  @Query((returns) => [Register])
  async getRegisters(): Promise<Register[]> {
    return this.registerService.getRegisters();
  }

  //멤버 생성
  @Mutation((returns) => Boolean)
  async createRegister(
    @Args('input') createRegisterDto: CreateRegisterDTO,
  ): Promise<boolean> {
    try {
      await this.registerService.createRegister(createRegisterDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  // //멤버 삭제
  // @Mutation((returns) => Boolean)
  // async deleteRegister(
  //   @Args('input') updateRegisterDto: DeleteRegisterDTO,
  // ): Promise<boolean> {
  //   try {
  //     await this.registerService.deleteRegister(updateRegisterDto);
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // }
}
