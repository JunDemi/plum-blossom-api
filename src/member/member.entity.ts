import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/** 회원DB 모델 */
@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class MemberEntity {
  /** PK */
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  /** 이름 */
  @Field((is) => String)
  @Column()
  @IsString()
  @Length(2, 20)
  name: string;

  /** 직업 */
  @Field((type) => String)
  @Column()
  @IsString()
  job: string;

  /** 비밀번호 */
  @Field((type) => String)
  @Column()
  @IsString()
  password: string;

  /** 관리자 여부 */
  @Field((type) => Boolean, { defaultValue: false })
  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  isManager?: boolean;
}
