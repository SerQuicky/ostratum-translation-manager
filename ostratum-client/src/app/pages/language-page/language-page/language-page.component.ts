import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/others/storage/storage.service';

@Component({
  selector: 'app-language-page',
  templateUrl: './language-page.component.html',
  styleUrls: ['./language-page.component.scss']
})
export class LanguagePageComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.initSidebar(4);
  }

}
