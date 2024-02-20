import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CartItem, CreateOrderReq } from 'src/types/order';

export type ParsedCreateOrderReq = Omit<Prisma.OrderCreateInput, 'items'> & {
  items: CartItem[]
}

@Injectable()
export class ParseOrderPipe implements PipeTransform<CreateOrderReq, ParsedCreateOrderReq> {
  transform(input: CreateOrderReq, metadata: ArgumentMetadata): ParsedCreateOrderReq {
    const {
      billingAddress, shippingAddress, shippingSameAsBilling,
      orderNotes, items,
    } = input
    const _shippingAddress = shippingSameAsBilling ? billingAddress : shippingAddress

    const orderInput = {
      billingFirstName: billingAddress.firstName,
      billingLastName: billingAddress.lastName,
      billingAddress: billingAddress.address,
      billingAddress2: billingAddress.address2,
      billingEmail: billingAddress.email,
      billingPhone: billingAddress.phone,
      billingCity: billingAddress.city,
      billingState: billingAddress.state,
      billingZip: billingAddress.zip,
      billingCountry: billingAddress.country,

      shippingFirstName: _shippingAddress.firstName,
      shippingLastName: _shippingAddress.lastName,
      shippingAddress: _shippingAddress.address,
      shippingAddress2: _shippingAddress.address2,
      shippingCity: _shippingAddress.city,
      shippingState: _shippingAddress.state,
      shippingZip: _shippingAddress.zip,
      shippingCountry: _shippingAddress.country,

      notes: orderNotes,
      user: {},
      items,
    }

    return orderInput
  }
}