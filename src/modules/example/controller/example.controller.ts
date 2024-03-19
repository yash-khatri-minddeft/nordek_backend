import { Controller, Get } from '@nestjs/common';

@Controller('/example')
export class ExampleController {
  @Get()
  public getHelloWorld() {
    return 'Hello';
  }
}
