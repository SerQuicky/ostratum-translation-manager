import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { CommonCommunication } from 'src/app/services/communication/common.communication';
import { StorageService } from 'src/app/services/others/storage/storage.service';
import { ProjectService } from '../../services/communication/project/project.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {

  public projects: Project[] = [];

  constructor(private projectService: ProjectService, private storageService: StorageService) { 
  }

  ngOnInit(): void {
    this.storageService.setSidebarStatus(0);
    this.projectService.getProjects().subscribe(response => {
      this.projects = response.value;
    })
  }

}
