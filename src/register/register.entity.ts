import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsArray,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

/** 회원DB 모델 */
@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Register {
  /** PK */
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  no: number;

  /** 이름 */
  @Field((is) => String)
  @Column()
  @IsString()
  @Length(2, 20)
  name: string;

  /** 질문 답변 6가지 */
  @Field((type) => [String])
  @Column('text', { array: true })
  @IsArray()
  question: string[];

  /** 기타 질문 사항 */
  @Field((is) => String, { defaultValue: '' })
  @Column({ default: '' })
  @IsOptional()
  @IsString()
  otherQuestion: string;

  /** 생성일 */
  @Field((type) => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @IsOptional()
  createdAt: Date;
}
