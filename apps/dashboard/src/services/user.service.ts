import { Injectable } from '@angular/core';
import { ICreateUser, IUser } from '../models/user.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${environment.api}/users`;

  constructor(private http: HttpClient) { }

  createUser(user: ICreateUser): Observable<void> {
    return this.http.post<void>(this.url, user);
  }

  findUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/${id}`);
  }

  updateUser(user: IUser): Observable<void> {
    return this.http.put<void>(`${this.url}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
