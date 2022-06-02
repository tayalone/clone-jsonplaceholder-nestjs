import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './posts/posts.module'
import { CommentsModule } from './comments/comments.module'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'], // ตั้งค่าตัวแปร env file path ที่จะอ่าน
      load: [configuration],
      isGlobal: true,
    }),
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}
