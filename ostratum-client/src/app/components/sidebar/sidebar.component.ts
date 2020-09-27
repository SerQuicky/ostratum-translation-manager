import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/others/storage/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public logoURL: string = "../../../assets/images/ostratum_logo_2.png";

  constructor(public storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem("darkmode"))) {
      this.logoURL = "../../../assets/images/ostratum_logo_dark.png"
    }
  }

  public navigateThroughSidebar(page: string, index: number): void {
    this.storageService.setSidebarStatus(index);
    this.router.navigate(['/main/' + page]);
  }

}
