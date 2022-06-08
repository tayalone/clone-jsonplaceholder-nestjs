import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import configuration from './config/configuration'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './posts/posts.module'
import { CommentsModule } from './comments/comments.module'
import { PrismaModule } from './services/prisma/prisma.module'
import { TodosModule } from './todos/todos.module'
import { UsersModule } from './users/users.module'
import { AlbumsModule } from './albums/albums.module'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'], // ตั้งค่าตัวแปร env file path ที่จะอ่าน
      load: [configuration],
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    PrismaModule,
    PostsModule,
    CommentsModule,
    TodosModule,
    UsersModule,
    AlbumsModule,
  ],
})
export class AppModule {}
