import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ServerResponse } from 'src/app/interfaces/response.interface';
import { ToastService } from '../others/toast/toast.service';

@Injectable({
    providedIn: 'root'
})
export class CommonCommunication {

    public server: string = "http://localhost:3001/";

    public constructor(private http: HttpClient, private router: Router, private toastService: ToastService) { }

    public getRequest<T>(url: string): Subject<ServerResponse<T>> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', localStorage.getItem("aot"));

        const responseSubject: Subject<ServerResponse<T>> = new Subject<ServerResponse<T>>();

        this.http.get<ServerResponse<T>>(this.server + url, { headers: headers })
            .subscribe(response => {
                this.validateReponse<T>(response);
                responseSubject.next(response);
            });

        return responseSubject;
    }

    public postRequest<T>(url: string, body: any): Subject<ServerResponse<T>> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', localStorage.getItem("aot"));

        const responseSubject: Subject<ServerResponse<T>> = new Subject<ServerResponse<T>>();


        this.http.post<ServerResponse<T>>(this.server + url, body, { headers: headers })
        .subscribe(response => {
            this.validateReponse<T>(response);
            responseSubject.next(response);
        });

        return responseSubject;

    }

    public validateReponse<T>(response: ServerResponse<T>): void {
        if (response.code == 400) {
            this.router.navigate(['/']);
            this.toastService.determineToast(response);
        }
    }
}