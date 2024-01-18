export class User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  emailVerifiedAt: string;
  profile?: Profile

  constructor(user: User) {
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.phoneNumber = user.phoneNumber
    this.emailVerifiedAt = user.emailVerifiedAt
    this.profile = user.profile
  }

  fullName() {
    return this.firstName + " " + this.lastName
  }

  isEmailVerified() {
    return !!this.emailVerifiedAt
  }
}

export type Profile = {
  preferredTheme: string
  stripeCustomerId: string
}