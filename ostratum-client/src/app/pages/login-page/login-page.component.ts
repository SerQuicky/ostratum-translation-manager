import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonCommunication } from 'src/app/services/communication/common.communication';
import { AuthenticationService } from '../../services/communication/authentication/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  public username: string = "";
  public password: string = "";

  constructor(private authService: AuthenticationService, private common: CommonCommunication, private router: Router) { }

  ngOnInit(): void {}

  public signIn(): void {
    this.authService.authenticate("Test", "A12").subscribe(auth => {
      localStorage.setItem("aot", auth.token);
      this.router.navigate(['main/projects']);
    });
  }


}
