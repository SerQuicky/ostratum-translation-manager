import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonCommunication } from '../common.communication';
import { Project } from '../../../interfaces/project.interface';
import { Translation } from 'src/app/interfaces/translation.interface';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private common: CommonCommunication) { }

  public getTranslations(projectId: number): Observable<Translation[]> {
    return this.common.postRequest("translations", {projectId: projectId});
  }
}
