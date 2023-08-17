import { Prisma } from "@prisma/client";
import { Expose, Transform } from "class-transformer";
import { IsOptional } from "class-validator";

export class DiskImagesQuery {
  tags: string[]

  @Expose({ name: 'exclude_tags' })
  excludeTags: string[]

  @IsOptional()
  @Transform(({ value }) => +value)
  page: number

  @Expose({ name: 'page-size' })
  @IsOptional()
  @Transform(({ value }) => +value)
  pageSize: number

  @IsOptional()
  q: string
}

export class DiskImagesFindManyQuery {
  skip?: number;
  take?: number;
  cursor?: Prisma.DiskImageWhereUniqueInput;
  where?: Prisma.DiskImageWhereInput;
  orderBy?: Prisma.DiskImageOrderByWithRelationInput;
}