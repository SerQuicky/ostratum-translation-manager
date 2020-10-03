import { Component, ComponentRef, OnInit } from '@angular/core';
import { DialogModalComponent } from 'src/app/components/modals/dialog-modal/dialog-modal.component';
import { UserModalComponent } from 'src/app/components/modals/user-modal/user-modal.component';
import { AuthenticationService } from 'src/app/services/communication/authentication/authentication.service';
import { ModalService } from 'src/app/services/others/modal/modal.service';
import { StorageService } from 'src/app/services/others/storage/storage.service';
import { ToastService } from 'src/app/services/others/toast/toast.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  public users: User[] = []

  constructor(public storageService: StorageService, private authenticationService: AuthenticationService, private modalService: ModalService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.storageService.initSidebar(3);
    this.loadUsers();
  }

  private loadUsers(): void {
    this.authenticationService.getUsers().subscribe(response => {
      this.users = response.value;
    });
  }

  public openRegisterModal(): void {
    const component: ComponentRef<UserModalComponent> = this.modalService.createUserModal(
      { id: 0, username: "", password: "" }, "Add new user",
      "Create", "Cancel", "btn btn-success");

    component.instance.execute.subscribe(data => {
      if (data[0]) {
        const user: User = data[1];
        this.authenticationService.register(user.username, user.password).subscribe(res => {
          this.toastService.determineToast(res);
          this.loadUsers();
        });
      }
      component.destroy();
    });
  }

  public openDeleteUserModal(user: User): void {
    let component: ComponentRef<DialogModalComponent> = this.modalService.createDialogModal(
      "Delete the user" + user.username,
      "Are you sure, that you want to delete " + user.username + " this process can not be reverted!",
      "Delete", "Cancel",
      "btn btn-danger");

    component.instance.execute.subscribe(success => {
      if (success) {
        this.authenticationService.deleteUser(user.id).subscribe(response => {
          this.toastService.determineToast(response, "SUCCESSFULLY DELETED User");
          this.loadUsers();
        });
      }
    });
  }

  public openUpdateUserModal(user: User): void {
    const component: ComponentRef<UserModalComponent> = this.modalService.createUserModal(
      user, "Update the user " + user.username,
      "Save", "Cancel", "btn btn-success");

    component.instance.execute.subscribe(data => {
      if (data[0]) {
        const user: User = data[1];
        this.authenticationService.updateUser(user).subscribe(res => {
          this.toastService.determineToast(res);
          this.loadUsers();
        });
      }
      component.destroy();
    });
  }
}
