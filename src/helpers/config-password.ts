import bcrypt from 'bcryptjs';

export class ConfigPassword {
  password: string;
  userPassword: string;
  constructor(password: string, userPassword: string) {
    this.password = password;
    this.userPassword = userPassword;
  }

  match() {
    const match = bcrypt.compare(this.password, this.userPassword);
    return match;
  }
}
