import { ApiProperty } from '@nestjs/swagger';

export class AttributesDto {
  @ApiProperty()
  lastActiveAt: Date;
}
