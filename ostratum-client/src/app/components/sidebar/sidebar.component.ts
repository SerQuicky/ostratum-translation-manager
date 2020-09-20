import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/others/storage/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public storageService: StorageService) { }

  ngOnInit(): void {
  }

}
