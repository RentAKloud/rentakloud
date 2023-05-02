export class User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  constructor(user: User) {
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.phoneNumber = user.phoneNumber
  }

  fullName() {
    return this.firstName + " " + this.lastName
  }
}