import { Component, ComponentRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { EditModalComponent } from 'src/app/components/modals/edit-modal/edit-modal.component';
import { TranslationProject } from 'src/app/interfaces/translation.project.interface';
import { ProjectService } from 'src/app/services/communication/project/project.service';
import { TranslationService } from 'src/app/services/communication/translation/translation.service';
import { ModalService } from 'src/app/services/others/modal/modal.service';
import { StorageService } from 'src/app/services/others/storage/storage.service';
import { ToastService } from 'src/app/services/others/toast/toast.service';

@Component({
  selector: 'app-translation-projects-page',
  templateUrl: './translation-projects-page.component.html',
  styleUrls: ['./translation-projects-page.component.scss']
})
export class TranslationProjectsPageComponent implements OnInit, OnDestroy {

  public tProjects: TranslationProject[] = [];
  private projectId: number;
  public projectSubscription: Subscription;

  constructor(private projectService: ProjectService,
    private modalService: ModalService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.projectId = parseInt(this.route.snapshot.paramMap.get('projectId'));
    this.loadTranslationProjects();
    this.projectSubscription = this.storageService.updateProjectsSubject.subscribe(_ => this.loadTranslationProjects());
  }

  public openAddNewProjectModal(): void {
    const component: ComponentRef<EditModalComponent> = this.modalService.createProjectEditModal(
      this.translate.instant("PROJECT.ADD_TR"),
      { id: 0, name: "", description: "", projectId: this.projectId },
      this.translate.instant("MODAL.CREATE"),
      this.translate.instant("MODAL.CANCEL"),
      "btn btn-success", this.projectId);

    component.instance.execute.subscribe(data => {
      if (data[0]) {
        const project: TranslationProject = data[1];
        this.projectService.addTranslationProject(project.name, project.description, project.projectId).subscribe(res => {
          this.toastService.determineToast(res, "TOAST.PROJECT_CREATED");
          this.loadTranslationProjects();
        });
      }
      component.destroy();
    });
  }

  private loadTranslationProjects(): void {
    this.projectService.getTranslationProjects(this.projectId).subscribe(response => {
      this.tProjects = response.value;
    })
  }

  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe;
  }

}
