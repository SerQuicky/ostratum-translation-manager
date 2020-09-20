import { Component, OnInit } from '@angular/core';
import { TranslationProject } from 'src/app/interfaces/translation.project.interface';
import { ProjectService } from 'src/app/services/communication/project/project.service';

@Component({
  selector: 'app-translation-projects-page',
  templateUrl: './translation-projects-page.component.html',
  styleUrls: ['./translation-projects-page.component.scss']
})
export class TranslationProjectsPageComponent implements OnInit {

  public tProjects: TranslationProject[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getTranslationProjects().subscribe(tprojects => {
      this.tProjects = tprojects;
      console.log(this.tProjects);
    })
  }

}
