import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/communication/authentication/authentication.service';
import { StorageService } from 'src/app/services/others/storage/storage.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  public users: User[] = []

  constructor(public storageService: StorageService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.storageService.initSidebar(3);
    this.loadUsers();
  }

  private loadUsers(): void {
    this.authenticationService.getUsers().subscribe(response => {
      this.users = response.value;
    });
  }

}
