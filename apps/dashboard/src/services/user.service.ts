import { Injectable } from '@angular/core';
import { ICreateUser } from '../models/user.interface';
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
}
