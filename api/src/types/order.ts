import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, ValidateNested } from "class-validator";

class Address {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email?: string;

  @IsNotEmpty()
  address: string;

  address2: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  zip: string;

  @IsNotEmpty()
  country: string;
}

export class CreateOrderReq {
  @ValidateNested()
  @Type(() => Address)
  billingAddress: Address;

  @ValidateNested()
  shippingAddress: Address;

  orderNotes: string;
  shippingSameAsBilling: boolean;

  @IsArray()
  @ArrayMinSize(1)
  items: any[];
}