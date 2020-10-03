import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { Authenticate } from '../../../interfaces/authenticate.interface';
import { ServerResponse } from '../../../interfaces/response.interface';
import { CommonCommunication } from '../common.communication';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private common: CommonCommunication) { }

  public authenticate(username: string, password: string): Observable<ServerResponse<string>> {
    return this.common.postRequest<string>("authenticate", {"username": username, "password": password});
  }

  public register(username: string, password: string): Observable<ServerResponse<any>> {
    return this.common.postRequest<string>("register", {"username": username, "password": password});
  }

  public changePassword(username: string, oldPassword: string, newPassword: string): Observable<ServerResponse<any>> {
    return this.common.postRequest<any>("changePassword", {"username": username, "oldPassword": oldPassword, "newPassword": newPassword});
  }

  public getUsers(): Observable<ServerResponse<User>> {
    return this.common.getRequest<User>("users");
  }

  public deleteUser(id: number): Observable<ServerResponse<any>> {
    return this.common.postRequest<any>("deleteUser", {id: id});
  }

  public updateUser(user: User): Observable<ServerResponse<any>> {
    return this.common.postRequest<any>("updateUser", {id: user.id, username: user.username, password: user.password});
  }

  public logout(): Observable<any> {
    return this.common.postRequest<any>("logout", {});
  }
}
