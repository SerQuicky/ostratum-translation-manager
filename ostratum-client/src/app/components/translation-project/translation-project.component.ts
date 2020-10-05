import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationProject } from 'src/app/interfaces/translation.project.interface';
import { ProjectService } from 'src/app/services/communication/project/project.service';
import { ModalService } from 'src/app/services/others/modal/modal.service';
import { StorageService } from 'src/app/services/others/storage/storage.service';
import { ToastService } from 'src/app/services/others/toast/toast.service';
import { DialogModalComponent } from '../modals/dialog-modal/dialog-modal.component';
import { EditModalComponent } from '../modals/edit-modal/edit-modal.component';

@Component({
  selector: 'app-translation-project',
  templateUrl: './translation-project.component.html',
  styleUrls: ['./translation-project.component.scss']
})
export class TranslationProjectComponent implements OnInit {

  @Input("tproject") project: TranslationProject;

  constructor(private router: Router,
    private storageService: StorageService,
    private modalService: ModalService,
    private toastService: ToastService,
    private projectService: ProjectService,
    public translate: TranslateService) { }

  ngOnInit(): void {}

  private openTranslationProject(): void {
    this.router.navigate(['main/translations', this.project.projectId]);
  }

  public resolveProjectClick(event: string): void {
    switch ((event['target'] as Element).id) {
      case "delete":
        this.openDeleteModal();
        break;
      case "edit":
        this.openEditModal();
        break;
      default:
        this.openTranslationProject();
        break;
    }
  }

  private openDeleteModal(): void {
    let component: ComponentRef<DialogModalComponent> = this.modalService.createDialogModal(
      this.translate.instant("PROJECT.DELETE", { name: this.project.name }),
      this.translate.instant("PROJECT.DELETE_DESCRIPTION", { name: this.project.name }),
      this.translate.instant("MODAL.DELETE"),
      this.translate.instant("MODAL.CANCEL"),
      "btn btn-danger");

    component.instance.execute.subscribe(success => {
      if (success) {
        this.projectService.deleteTranslateProject(this.project.id).subscribe(response => {
          this.toastService.determineToast(response, "TOAST.PROJECT_DELETED");
          this.storageService.updateProjectsSubject.next();
        });
      }
    });
  }

  private openEditModal(): void {
    let component: ComponentRef<EditModalComponent> = this.modalService.createProjectEditModal(
      this.translate.instant("PROJECT.EDIT"),
      this.project,
      this.translate.instant("MODAL.SAVE"),
      this.translate.instant("MODAL.CANCEL"),
      "btn btn-primary"
    );

    component.instance.execute.subscribe(data => {
      if (data[0]) {
        this.projectService.updateTranslationProject(data[1]).subscribe(response => {
          this.toastService.determineToast(response, "TOAST.PROJECT_UPDATED");
          this.storageService.updateProjectsSubject.next();
        });
      }
    });
  }

}
