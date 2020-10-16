import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonCommunication } from '../common.communication';
import { Project } from '../../../interfaces/project.interface';
import { Translation } from 'src/app/interfaces/translation.interface';
import { ServerResponse } from 'src/app/interfaces/response.interface';
import { File } from 'src/app/interfaces/file.interface';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private common: CommonCommunication) { }

  public getTranslations(projectId: number): Observable<ServerResponse<Translation>> {
    return this.common.postRequest<Translation>("translations", { projectId: projectId });
  }

  public addTranslation(file: File, languageId: number, projectId: number): Observable<ServerResponse<any>> {
    return this.common.postRequest<any>("addTranslation", { fileName: file.name, file: file.file, type: file.type, languageId: languageId, projectId: projectId });
  }

  public updateTranslation(values: [number, string][]): Observable<ServerResponse<any>> {
    return this.common.postRequest<any>("updateTranslation", { values: values });
  }

  public deleteTranslation(translationId: number): Observable<ServerResponse<any>> {
    return this.common.postRequest<any>("deleteTranslation", { id: translationId });
  }
}
