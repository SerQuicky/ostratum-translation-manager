import { Component, ComponentRef, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { EditModalComponent } from 'src/app/components/modals/edit-modal/edit-modal.component';
import { Project } from 'src/app/interfaces/project.interface';
import { CommonCommunication } from 'src/app/services/communication/common.communication';
import { ModalService } from 'src/app/services/others/modal/modal.service';
import { StorageService } from 'src/app/services/others/storage/storage.service';
import { ToastService } from 'src/app/services/others/toast/toast.service';
import { ProjectService } from '../../services/communication/project/project.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit, OnDestroy {

  public projects: Project[] = [];
  public projectSubscription: Subscription;

  constructor(private projectService: ProjectService, 
    private storageService: StorageService, 
    private modalService: ModalService, 
    private toastService: ToastService,
    public translate: TranslateService) {}

  ngOnInit(): void {
    this.storageService.setSidebarStatus(0);
    this.loadProjects();
    this.projectSubscription = this.storageService.updateProjectsSubject.subscribe(_ => this.loadProjects());
  }

  public openAddNewProjectModal(): void {
    const component: ComponentRef<EditModalComponent> = this.modalService.createProjectEditModal(
    this.translate.instant("PROJECT.ADD"), 
    {id: 0, name: "", description: ""},
    this.translate.instant("MODAL.CREATE"), 
    this.translate.instant("MODAL.CANCEL"), 
    "btn btn-success");

    component.instance.execute.subscribe(data => {

      if (data[0]) {
        const project: Project = data[1];
        this.projectService.addProject(project.name, project.description).subscribe(res => {
          this.toastService.determineToast(res, "TOAST.PROJECT_CREATED");
          this.loadProjects();
        });
      }
      this.modalService.destroyModal(component);
    });
  }

  private loadProjects(): void {
    this.projectService.getProjects().subscribe(response => {
      this.projects = response.value;
    })
  }

  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
  }


}
