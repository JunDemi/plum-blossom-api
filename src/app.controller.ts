import { Controller, Get } from '@nestjs/common';

// Entry Point
@Controller('/')
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
