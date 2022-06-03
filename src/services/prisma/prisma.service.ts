/* eslint-disable no-param-reassign */
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

const SOFT_DELETE_MODEL = ['Post', 'Comment']
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private softDeleteMiddleware() {
    this.$use(async (params, next) => {
      if (SOFT_DELETE_MODEL.includes(params.model)) {
        if (params.action === 'delete') {
          // Delete queries
          // Change action to an update
          params.action = 'update'
          params.args.data = { deletedAt: new Date() }
        }
        if (params.action === 'deleteMany') {
          // Delete many queries
          params.action = 'updateMany'
          if (params.args.data !== undefined) {
            params.args.data.deletedAt = new Date()
          } else {
            params.args.data = { deletedAt: new Date() }
          }
        }
      }
      return next(params)
    })
  }

  async onModuleInit() {
    console.info(`prisma was connectd db`)
    await this.$connect()
    this.softDeleteMiddleware()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
