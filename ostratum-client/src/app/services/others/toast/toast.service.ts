import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ServerResponse } from 'src/app/interfaces/response.interface';
export declare let require: any;
const halfmoon = require('halfmoon');

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private translate: TranslateService) { }

  public determineToast(response: ServerResponse<any>, timer?: number): void {
    this.showToast(this.translate.instant(response.title), this.translate.instant(response.message), response.code == 200 ? "alert-success" : "alert-danger", "", timer ? timer : 4000);
  }

  public showToast(title: string, message: string, alertType: string, fillType: string, timer: number): void {
    // Built-in function
    halfmoon.initStickyAlert({
      content: message,      // Required, main content of the alert, type: string (can contain HTML)
      title: title,     // Optional, title of the alert, default: "", type: string
      alertType: alertType,              // Optional, type of the alert, default: "", must be "alert-primary" || "alert-success" || "alert-secondary" || "alert-danger"
      fillType: fillType,               // Optional, fill type of the alert, default: "", must be "filled-lm" || "filled-dm" || "filled"
      hasDismissButton: true,     // Optional, the alert will contain the close button if true, default: true, type: boolean
      timeShown: timer             // Optional, time the alert stays on the screen (in ms), default: 5000, type: number
    })
  }


}
