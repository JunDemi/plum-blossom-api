import { Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

/** 공유 컬럼 */
@Entity()
export class CommonEntity {
  /** PK */
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;
}
