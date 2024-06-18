import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILoginUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `${environment.api}/login`;

  hasUserLogged = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  createUser(user: ILoginUser): Observable<void> {
    return this.http.post<void>(this.url, user);
  }

  setUserLogged(isLogin: boolean): void {
    this.hasUserLogged.next(isLogin);
  }

}
