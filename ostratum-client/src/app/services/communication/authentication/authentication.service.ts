import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authenticate } from '../../../interfaces/authenticate.interface';
import { CommonCommunication } from '../common.communication';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private common: CommonCommunication) { }

  public authenticate(username: string, password: string): Observable<Authenticate> {
    return this.common.postRequest<Authenticate>("authenticate", {"username": username, "password": password});
  }
}
