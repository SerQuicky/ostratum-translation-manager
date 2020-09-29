import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonCommunication } from '../common.communication';
import { Project } from '../../../interfaces/project.interface';
import { TranslationProject } from 'src/app/interfaces/translation.project.interface';
import { ServerResponse } from 'src/app/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private common: CommonCommunication) { }

  public getProjects(): Observable<ServerResponse<Project>> {
    return this.common.getRequest<Project>("userProjects");
  }

  public getTranslationProjects(): Observable<ServerResponse<TranslationProject>> {
    return this.common.getRequest<TranslationProject>("translationProjects");
  }
}
