import { Injectable } from '@nestjs/common';
import { IGuildInfo } from 'src/interface';
import { NexonApiService } from 'src/nexon/nexonApi.service';

@Injectable()
export class PlumService {
  constructor(private readonly nexonApiService: NexonApiService) {}

  async getGuildInfo(): Promise<IGuildInfo> {
    //guild 정보 조회
    const guildInfo = await this.nexonApiService.getGuildInfo();

    const resultData: IGuildInfo | null = guildInfo
      ? {
          date: guildInfo.date,
          world_name: guildInfo.world_name,
          guild_name: guildInfo.guild_name,
          guild_level: guildInfo.guild_level,
          guild_fame: guildInfo.guild_fame,
          guild_point: guildInfo.guild_point,
          guild_master_name: guildInfo.guild_master_name,
          guild_member_count: guildInfo.guild_member_count,
          guild_member: guildInfo.guild_member,
        }
      : null;

    if (!resultData) {
      throw new Error('Failed to fetch guild information');
    }
    return resultData;
  }
}
