import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/services/communication/translation/translation.service';
import { StorageService } from 'src/app/services/others/storage/storage.service';
import { AuthenticationService } from '../../services/communication/authentication/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  public username: string = "";
  public password: string = "";

  constructor(private authService: AuthenticationService, 
    public storageService: StorageService, 
    private router: Router,
    public translate: TranslationService) { }

  ngOnInit(): void {
    this.storageService.setDesignState();
  }

  public signIn(): void {
    this.authService.authenticate("Administrator", "A12").subscribe(response => {
      localStorage.setItem("username", "Test");
      localStorage.setItem("aot", response.value[0]);
      localStorage.setItem("state", response.value[1]);
      this.storageService.adminState = JSON.parse(response.value[1]);
      this.router.navigate(['main/projects']);
    });
  }


}
