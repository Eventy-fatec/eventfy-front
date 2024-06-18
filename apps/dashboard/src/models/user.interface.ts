export interface IUser {
  name: string;
  email: string;
  password: string;
  id: number;
  cpf: string;
  cellphone: string;
  birthdate: string;
}

export interface ICreateUser extends Omit<IUser, 'id'> {}
