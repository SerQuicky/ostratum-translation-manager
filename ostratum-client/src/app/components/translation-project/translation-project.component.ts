import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private projectService: ProjectService) { }

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
      "Delete " + this.project.name,
      "Are you sure, that you want to delete " + this.project.name + " this process can not be reverted!",
      "Delete", "Cancel",
      "btn btn-danger");

    component.instance.execute.subscribe(success => {
      if (success) {
        this.projectService.deleteTranslateProject(this.project.id).subscribe(response => {
          this.toastService.determineToast(response, "SUCCESSFULLY DELETED PROJECT");
          this.storageService.updateProjectsSubject.next();
        });
      }
    });
  }

  private openEditModal(): void {
    let component: ComponentRef<EditModalComponent> = this.modalService.createProjectEditModal(
      "Edit project",
      this.project,
      "Save", "Cancel",
      "btn btn-primary"
    );

    component.instance.execute.subscribe(data => {
      if (data[0]) {
        this.projectService.updateTranslationProject(data[1]).subscribe(response => {
          this.toastService.determineToast(response, "SUCCESSFULLY UPDATED PROJECT");
          this.storageService.updateProjectsSubject.next();
        });
      }
    });
  }

}
