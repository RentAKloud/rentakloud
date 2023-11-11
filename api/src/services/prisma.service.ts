import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    Object.assign(
      this,
      this.$extends({
        name: 'fullName',
        result: {
          user: {
            fullName: {
              needs: { firstName: true, lastName: true },
              compute({ firstName, lastName }) {
                if (firstName && lastName) {
                  return `${firstName} ${lastName}`
                }
                return firstName || lastName
              },
            }
          }
        }
      })
    )
  }

  // Deprecated https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management#exit-hooks
  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async () => {
  //     await app.close();
  //   });
  // }
}