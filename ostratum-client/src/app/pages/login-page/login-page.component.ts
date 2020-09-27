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
  public logoURL: string = "../../../assets/images/ostratum_logo_2.png";
  public darkModeOn: boolean = false;

  constructor(private authService: AuthenticationService, private common: CommonCommunication, private router: Router) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem("darkmode"))) {
      this.logoURL = "../../../assets/images/ostratum_logo_dark.png"
    }
  }

  public signIn(): void {
    this.authService.authenticate("Test", "A12").subscribe(auth => {
      localStorage.setItem("aot", auth.token);
      this.router.navigate(['main/projects']);
    });
  }


}
