import { Module } from '@nestjs/common';
import { MemberResolver } from './member.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './member.entity';
import { MemberService } from './member.service';

@Module({
    imports: [TypeOrmModule.forFeature([MemberEntity])],
    providers: [MemberResolver, MemberService],
})
export class MemberModule {}
