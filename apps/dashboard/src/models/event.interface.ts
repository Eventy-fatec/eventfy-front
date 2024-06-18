import { IUser } from "./user.interface"

export interface IEvent {
  id: number
  title: string
  description: string
  openingDate: string
  closingDate: string
  startTime: string
  finishTime: string
  User:  IUser
  street: string
  streetNumber: string
  city: string;
  state: string;
  cep: string;
}
  
  export interface ICreateEvent extends Omit<IEvent, 'id'> {}
  