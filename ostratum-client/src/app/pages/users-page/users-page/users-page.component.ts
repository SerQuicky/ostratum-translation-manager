import { Component, ComponentRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(public storageService: StorageService,
    private authenticationService: AuthenticationService,
    private modalService: ModalService,
    private toastService: ToastService,
    public translate: TranslateService) { }

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
      { id: 0, username: "", password: "" },
      this.translate.instant("USER.ADD"),
      this.translate.instant("MODAL.CREATE"),
      this.translate.instant("MODAL.CANCEL"),
      "btn btn-success");

    component.instance.execute.subscribe(data => {
      if (data[0]) {
        const user: User = data[1];
        this.authenticationService.register(user.username, user.password).subscribe(res => {
          this.toastService.determineToast(res, "TOAST.USER_CREATED");
          this.loadUsers();
        });
      }
      this.modalService.destroyModal(component);
    });
  }

  public openDeleteUserModal(user: User): void {
    let component: ComponentRef<DialogModalComponent> = this.modalService.createDialogModal(
      this.translate.instant("USER.DELETE", { name: user.username }),
      this.translate.instant("USER.DELETE_DESCRIPTION", { name: user.username }),
      this.translate.instant("MODAL.DELETE"),
      this.translate.instant("MODAL.CANCEL"),
      "btn btn-danger");

    component.instance.execute.subscribe(success => {
      if (success) {
        this.authenticationService.deleteUser(user.id).subscribe(response => {
          this.toastService.determineToast(response, "TOAST.USER_DELETED");
          this.loadUsers();
        });
      }
    });
  }

  public openUpdateUserModal(user: User): void {
    const component: ComponentRef<UserModalComponent> = this.modalService.createUserModal(
      user,
      this.translate.instant("USER.UPDATE", { name: user.username }),
      this.translate.instant("MODAL.SAVE"),
      this.translate.instant("MODAL.CANCEL"),
      "btn btn-success");

    component.instance.execute.subscribe(data => {
      if (data[0]) {
        const user: User = data[1];
        this.authenticationService.updateUser(user).subscribe(res => {
          this.toastService.determineToast(res, "TOAST.USER_UPDATED");
          this.loadUsers();
        });
      }
      this.modalService.destroyModal(component);
    });
  }
}
