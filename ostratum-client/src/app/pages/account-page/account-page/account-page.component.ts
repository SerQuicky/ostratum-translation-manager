import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/others/storage/storage.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.initSidebar(1);
  }

  ngAfterViewChecked(): void {}

}
