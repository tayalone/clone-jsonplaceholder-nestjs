import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const nodeEnv: string = this.configService.get<string>('nodeEnv')
    return `Hello World and NODE_ENV is ${nodeEnv}`
  }
}
