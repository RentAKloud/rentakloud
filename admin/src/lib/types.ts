export class Product {
  public constructor(
    public id: number,
    public name: string,
    public categories: { title: string }[],
    public prices: { amount: number }[]
  ) { }
}

export class User {
  public constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public createdAt: string,
    public updatedAt: string
  ) { }

  static fullName(user: User) {
    const {firstName, lastName} = user
    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    }
    return firstName || lastName
  }
}