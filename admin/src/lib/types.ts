export class Product {
  constructor(
    public id: number,
    public name: string,
    public shortDescription: string,
    public description: string,
    public categories: Category[],
    public prices: { amount: number, currency: string }[],
    public images: { alt: string, src: string }[]
  ) { }
}

export class Category {
  constructor(
    public id: number,
    public title: string,
    public slug: string
  ) { }
}

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public createdAt: string,
    public updatedAt: string
  ) { }

  static fullName(user: User) {
    const { firstName, lastName } = user
    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    }
    return firstName || lastName
  }
}