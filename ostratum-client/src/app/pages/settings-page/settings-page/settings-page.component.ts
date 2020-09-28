import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/others/storage/storage.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  public darkModeOn: boolean = false;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.initSidebar(2);
    this.darkModeOn = JSON.parse(localStorage.getItem("darkmode"));

    if(JSON.parse(localStorage.getItem("darkmode"))) {
      document.getElementById("body").classList.add("dark-mode");
    }
  }

  public updateLightMode(): void {
    this.darkModeOn = false;
    this.setModeState();
  }

  public updateDarkMode(): void {
    this.darkModeOn = true;
    this.setModeState();
  }

  private setModeState() {
    localStorage.setItem("darkmode", JSON.stringify(this.darkModeOn));
    this.storageService.setDesignState();
  }


}
