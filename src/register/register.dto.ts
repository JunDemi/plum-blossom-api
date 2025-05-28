import { InputType, OmitType } from '@nestjs/graphql';
import { Register } from './register.entity';

//createRegister
@InputType()
export class CreateRegisterDTO extends OmitType(Register, ['no']) {}


// //deleteRegister
// @InputType()
// export class DeleteRegisterDTO {
//   @Field(() => Number)
//   @IsNumber() // <-- Pipe에서 타입을 검증하지 않은 필드는 차단될 수 있음
//   no: number;
// }
