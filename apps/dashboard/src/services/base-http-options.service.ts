import { Injectable } from '@angular/core';

import { Store } from '@ngxs/store';
import { HttpHeaders } from '@angular/common/http';
import { AuthState } from 'projects/app-std-core/src/app/state-core/auth/auth.state';

@Injectable({
  providedIn: 'root',
})
export class BuildHttpOptionsService {
  constructor(private _store: Store) {}

  public buildHttpOptions(
    authenticated?: boolean,
    contentType?: string,
    credentials?: boolean
  ) {
    let authentication = this._store.selectSnapshot(AuthState.authentication);
    if (!contentType) {
      contentType = 'application/json; charset=UTF-8';
    }

    if (authenticated && authentication && authentication.token) {
      return {
        headers: new HttpHeaders({
          'Content-Type': contentType,
          Authorization: authentication.token,
        }),
        withCredentials: credentials,
      };
    } else {
      return {
        headers: new HttpHeaders({
          'Content-Type': contentType,
        }),
        withCredentials: credentials,
      };
    }
  }
}