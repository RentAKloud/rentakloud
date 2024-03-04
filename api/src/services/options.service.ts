import { Injectable } from "@nestjs/common";
import { Prisma, Option } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { JsonValue } from "@prisma/client/runtime/library";
import { AppSettings } from "src/types/common.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class OptionsService {
  static appSettings: AppSettings
  private async loadAppSettings(appSettings?: AppSettings) {
    if (!appSettings) {
      appSettings = await this.option({ key: 'app-settings' }) as AppSettings
    }
    OptionsService.appSettings = appSettings
    this.ee.emit('app-settings.changed')
  }

  constructor(
    private prisma: PrismaService,
    private ee: EventEmitter2,
    ) {
    this.loadAppSettings()
  }

  private exclude<Option, Key extends keyof Option>(
    option: Option,
    keys: Key[]
  ): Omit<Option, Key> {
    for (let key of keys) {
      delete option[key]
    }
    return option
  }

  async option(
    optionWhereUniqueInput: Prisma.OptionWhereUniqueInput,
  ): Promise<JsonValue | null> {
    const option = await this.prisma.option.findUnique({
      where: optionWhereUniqueInput,
      select: { value: true }
    });

    return option.value
  }

  async options(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OptionWhereUniqueInput;
    where?: Prisma.OptionWhereInput;
    orderBy?: Prisma.OptionOrderByWithRelationInput;
  }): Promise<Option[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.option.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createOption(data: Prisma.OptionCreateInput): Promise<Option> {
    return this.prisma.option.create({
      data
    });
  }

  async updateOption(params: {
    where: Prisma.OptionWhereUniqueInput;
    data: Prisma.OptionUpdateInput;
  }): Promise<Option> {
    const { where, data } = params;

    const rv = await this.prisma.option.update({
      data,
      where,
    });

    // TODO will have to do it using redis pub/sub so multi threading using pm2 doesnt causes inconsistency
    if (where.key === 'app-settings') {
      this.loadAppSettings(rv.value as AppSettings)
    }

    return rv
  }

  async deleteOption(where: Prisma.OptionWhereUniqueInput): Promise<Option> {
    return this.prisma.option.delete({
      where,
    });
  }
}