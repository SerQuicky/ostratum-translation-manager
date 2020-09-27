import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ostratum-client';

  constructor() {
    if(JSON.parse(localStorage.getItem("darkmode"))) {
      document.getElementById("body").classList.add("dark-mode");
    }
  }


}
