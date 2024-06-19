import { ApiProperty } from '@nestjs/swagger';

export class CreateGarageDto {
  @ApiProperty()
  capacity: string;

  @ApiProperty()
  square: number;

  @ApiProperty()
  ammenities: string[];

  @ApiProperty()
  city: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  house_number: number;

  @ApiProperty()
  contact_name: string;

  @ApiProperty()
  contact_number: string;
}
