import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authenticate } from '../../../interfaces/authenticate.interface';
import { ServerResponse } from '../../../interfaces/response.interface';
import { CommonCommunication } from '../common.communication';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private common: CommonCommunication) { }

  public authenticate(username: string, password: string): Observable<Authenticate> {
    return this.common.postRequest<Authenticate>("authenticate", {"username": username, "password": password});
  }

  public changePassword(username: string, oldPassword: string, newPassword: string): Observable<ServerResponse<any>> {
    return this.common.postRequest<ServerResponse<any>>("changePassword", {"username": username, "oldPassword": oldPassword, "newPassword": newPassword});
  }
}
