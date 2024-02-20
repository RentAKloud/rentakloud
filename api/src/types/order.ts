import { ProductType, ShippingMethod } from "@prisma/client";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsPhoneNumber, ValidateNested } from "class-validator";
import { Price } from "./product.dto";
import { Plan } from "./instances.dto";

class Address {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email?: string;

  @IsPhoneNumber()
  phone?: string;

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

  shippingMethod: ShippingMethod

  @IsArray()
  @ArrayMinSize(1)
  items: CartItem[];

  @IsArray()
  couponCodes: { id: number }[]
}

export type OrderItem = {
  product: {
    id: number
    name: string
    prices: (Price & Plan)[]
    productType: ProductType
  }
  priceId?: string
  quantity: number
  isTrial?: boolean
}

export type CartItem = Omit<OrderItem, 'product'> & { productId: number }