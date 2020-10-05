import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/communication/authentication/authentication.service';
import { StorageService } from 'src/app/services/others/storage/storage.service';
import { ToastService } from 'src/app/services/others/toast/toast.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  public username: string = "";
  public oldPassword: string = "";
  public newPassword: string = "";

  constructor(private storageService: StorageService, 
    private toastService: ToastService, 
    private authenticationService: AuthenticationService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.storageService.initSidebar(1);
    this.username = localStorage.getItem("username");
  }

  public changePassword(): void {
    this.authenticationService.changePassword(this.username, this.oldPassword, this.newPassword).subscribe(res => {
      this.toastService.determineToast(res);
    });
  }
}
