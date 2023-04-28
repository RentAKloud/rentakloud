export class User {
  firstName: string;
  lastName: string;
  email: string;

  constructor(user: User) {
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
  }

  fullName() {
    return this.firstName + " " + this.lastName
  }
}