// src/common/http-client.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { IBasicInfo, IGuildInfo } from 'src/interface';

@Injectable()
export class NexonApiService {
  constructor(private readonly httpService: HttpService) {}

  //get
  async getApiCaller<T = any>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.get<T>(process.env.API_BASE_URL + endpoint, {
        headers: {
          'x-nxopen-api-key': process.env.NEXON_API_KEY,
        },
        ...config,
      }),
    );
    return response.data;
  }

  // ocid 조회
  async getOcidByName(name: string): Promise<string | null> {
    try {
      const response = await this.getApiCaller<{
        ocid: string;
      }>('/id', {
        params: { character_name: name },
      });
      return response.ocid || null;
    } catch (error) {
      console.error(`Error fetching OCID for ${name}:`, error);
      return null;
    }
  }

  // ocid로 기본 정보 조회
  async getBasicInfoByOcid(ocid: string): Promise<IBasicInfo | null> {
    try {
      const response = await this.getApiCaller<IBasicInfo>('/character/basic', {
        params: { ocid: ocid },
      });
      return response;
    } catch (error) {
      console.error(`Error fetching:`, error);
      return null;
    }
  }

  // 길드 정보 조회
  async getGuildInfo(): Promise<IGuildInfo | null> {
    try {
      const response = await this.getApiCaller<IGuildInfo>('/guild/basic', {
        params: { oguild_id: 'c00548e2d4a1c249dc389675247f5a3b' },
      });
      return response;
    } catch (error) {
      console.error(`Error fetching:`, error);
      return null;
    }
  }
}
