export interface IRegister {
  no: number;
  name: string;
  question: string[];
  otherQuestion: string;
  createdAt: Date;
  basicInfo: IBasicInfo | null;
}

//캐릭터 기본 정보
export interface IBasicInfo {
  date?: string;
  world_name: string;
  character_name: string;
  character_level: number;
  character_gender: string;
  character_exp_rate: string;
  character_class: string;
  character_image: string;
  character_guild_name: string;
  character_date_create: string;
  access_flag: boolean;
  liberation_quest_clear_flag: boolean;
}

// 길드 정보
export interface IGuildInfo {
  date?: string;
  world_name: string;
  guild_name: string;
  guild_level: number;
  guild_fame: number;
  guild_point: number;
  guild_master_name: string;
  guild_member_count: number;
  guild_member: string[];
}
