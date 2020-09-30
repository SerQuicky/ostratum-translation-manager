import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project.interface';
import { ModalService } from 'src/app/services/others/modal/modal.service';
import { DialogModalComponent } from '../modals/dialog-modal/dialog-modal.component';
import { EditModalComponent } from '../modals/edit-modal/edit-modal.component';
export declare let require: any;
const halfmoon = require('halfmoon');

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input() project: Project;

  constructor(private router: Router, private modalService: ModalService) { }

  ngOnInit(): void { }

  private openTranslationProject(): void {
    this.router.navigate(['main/tprojects', this.project.id]);
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
        // TODO: iniate deletion
      }
    });
  }

  private openEditModal(): void {
    let component: ComponentRef<EditModalComponent> = this.modalService.createEditModal(
      "Edit project",
      this.project.name,
      this.project.description,
      "Save", "Cancel",
      "btn btn-primary"
    );

    component.instance.execute.subscribe(success => {
      if (success) {
        // TODO: iniate deletion
      }
    });
  }
}
