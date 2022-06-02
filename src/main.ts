import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  /* เพิ่ม Code ตรงนัี้ */
  const configService = app.get(ConfigService)
  const port = configService.get<number>('port')
  /*--------------------------*/
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  console.info(`app running @ port: `, port)

  await app.listen(port)
}
bootstrap()
