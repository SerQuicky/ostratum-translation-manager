import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonCommunication {

    public server: string = "http://localhost:3001/";

    public constructor(private http: HttpClient) { }

    public getRequest<T>(url: string): Observable<T> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', localStorage.getItem("aot"));

        return this.http.get<T>(this.server + url, { headers: headers });
    }

    public postRequest<T>(url: string, body: any): Observable<T> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', localStorage.getItem("aot"));

        return this.http.post<T>(this.server + url, body, { headers: headers });
    }
}