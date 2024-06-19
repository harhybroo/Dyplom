import { ApiProperty } from '@nestjs/swagger';
export class CreatePlacementDto {
  @ApiProperty()
  roomAmmount: string;

  @ApiProperty()
  square: number;

  @ApiProperty()
  living_square: number;

  @ApiProperty()
  ammenities: string[];

  @ApiProperty()
  city: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  house_number: number;

  @ApiProperty()
  apart_number: number;

  @ApiProperty()
  flat: number;

  @ApiProperty()
  flat_total: number;

  @ApiProperty()
  contact_name: string;

  @ApiProperty()
  contact_number: string;
}
