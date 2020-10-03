import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/communication/authentication/authentication.service';
import { TranslationService } from 'src/app/services/communication/translation/translation.service';
import { ToastService } from 'src/app/services/others/toast/toast.service';
import { StorageService } from '../../services/others/storage/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public storageService: StorageService, 
    private router: Router, 
    private authenticationService: AuthenticationService, 
    private toastService: ToastService,
    public translate: TranslationService) { }

  ngOnInit(): void {
    this.storageService.setDesignState();
  }

  public navigateThroughSidebar(page: string, index: number): void {
    this.storageService.setSidebarStatus(index);
    this.router.navigate(['/main/' + page]);
  }
  
  public logout(): void {
    this.authenticationService.logout().subscribe(response => {
      this.router.navigate(['/']);
      this.toastService.determineToast(response);
    })
  }

}
