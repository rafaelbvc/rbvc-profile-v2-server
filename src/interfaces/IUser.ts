export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  roles: Array<[]>;
  active: boolean;
}
