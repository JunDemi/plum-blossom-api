import { Controller, Get } from '@nestjs/common';
import { PlumService } from './plum.service';

@Controller('/plum')
export class PlumController {
  constructor(private readonly plumService: PlumService) {}

  @Get()
  async getPlumData() {
    return this.plumService.getGuildInfo();
  }
}
