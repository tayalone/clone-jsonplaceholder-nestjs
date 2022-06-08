import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { PrismaService } from './services/prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  /* เพิ่ม Code ตรงนัี้ */
  const configService = app.get(ConfigService)
  const port = configService.get<number>('port')
  /*--------------------------*/
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      // enableDebugMessages: true,
      // forbidUnknownValues: true,
      // skipUndefinedProperties: true,
    }),
  )
  console.info(`app running @ port: `, port)

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  await app.listen(port)
}
bootstrap()
