import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/others/storage/storage.service';
import { AuthenticationService } from '../../services/communication/authentication/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  public username: string = "";
  public password: string = "";

  constructor(private authService: AuthenticationService, public storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.storageService.setDesignState();
  }

  public signIn(): void {
    this.authService.authenticate("Test", "A12").subscribe(auth => {
      localStorage.setItem("username", "Test");
      localStorage.setItem("aot", auth.token);
      this.router.navigate(['main/projects']);
    });
  }


}
