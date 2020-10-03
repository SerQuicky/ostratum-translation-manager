import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonCommunication } from '../common.communication';
import { Project } from '../../../interfaces/project.interface';
import { TranslationProject } from 'src/app/interfaces/translation.project.interface';
import { ServerResponse } from 'src/app/interfaces/response.interface';
import { StorageService } from '../../others/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private common: CommonCommunication, private storageService: StorageService) { }

  // Standard project endpoints

  public getProjects(): Observable<ServerResponse<Project>> {
    return this.common.getRequest<Project>(this.storageService.adminState ? "projects" : "userProjects");
  }

  public addProject(name: string, description: string): Observable<ServerResponse<any>> {
    return this.common.postRequest<any>("addProject", {name: name, description: description});
  }

  public updateProject(project: Project): Observable<ServerResponse<any>> {
    return this.common.postRequest<any>("updateProject", {id: project.id, name: project.name, description: project.description});
  }

  public deleteProject(id: number): Observable<ServerResponse<any>> {
    return this.common.postRequest<any>("deleteProject", {id: id});
  }

  // Translation projects endpoints

  public getTranslationProjects(projectId: number): Observable<ServerResponse<TranslationProject>> {
    return this.common.postRequest<TranslationProject>("translationProjects", {projectId: projectId});
  }

  public addTranslationProject(name: string, description: string, projectId: number): Observable<ServerResponse<any>> {
    return this.common.postRequest<any>("addTranslationProject", {name: name, description: description, projectId: projectId});
  }

  public updateTranslationProject(project: TranslationProject): Observable<ServerResponse<any>> {
    return this.common.postRequest<any>("updateTranslationProject", {id: project.id, name: project.name, description: project.description});
  }

  public deleteTranslateProject(id: number): Observable<ServerResponse<any>> {
    return this.common.postRequest<any>("deleteTranslateProject", {id: id});
  }
}
