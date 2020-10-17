import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ServerResponse } from 'src/app/interfaces/response.interface';
import { ModalService } from '../others/modal/modal.service';
import { ToastService } from '../others/toast/toast.service';

@Injectable({
    providedIn: 'root'
})
export class CommonCommunication {

    // server url with the endpoints
    public server: string = "http://localhost:3001/";

    public constructor(private http: HttpClient, private router: Router, private toastService: ToastService, private modalService: ModalService) { }


    /**
     * generic get request where T is the response type
     */
    public getRequest<T>(url: string): Subject<ServerResponse<T>> {
        this.modalService.showLoader();

        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', localStorage.getItem("aot"));

        const responseSubject: Subject<ServerResponse<T>> = new Subject<ServerResponse<T>>();

        this.http.get<ServerResponse<T>>(this.server + url, { headers: headers })
            .subscribe(response => {
                this.validateReponse<T>(response);
                this.modalService.hideLoader();
                responseSubject.next(response);
            });

        return responseSubject;
    }

    /**
     * generic post request where T can be situational
     */
    public postRequest<T>(url: string, body: any): Subject<ServerResponse<T>> {
        this.modalService.showLoader();

        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', localStorage.getItem("aot"));

        const responseSubject: Subject<ServerResponse<T>> = new Subject<ServerResponse<T>>();


        this.http.post<ServerResponse<T>>(this.server + url, body, { headers: headers })
            .subscribe(response => {
                this.validateReponse<T>(response);
                this.modalService.hideLoader();
                responseSubject.next(response);
            });


        return responseSubject;
    }

    /**
     * validate the response, if it contains a specific error code display a toast message
     */
    public validateReponse<T>(response: ServerResponse<T>): void {
        if (response.code == 400) {
            this.router.navigate(['/']);
            this.toastService.determineToast(response);
        }
    }
}