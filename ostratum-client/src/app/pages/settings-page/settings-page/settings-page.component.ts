import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/others/storage/storage.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.initSidebar(2);
  }

}
