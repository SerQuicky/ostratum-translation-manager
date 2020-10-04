import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/app/interfaces/language.interface';
import { ServerResponse } from 'src/app/interfaces/response.interface';
import { CommonCommunication } from '../common.communication';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private common: CommonCommunication) { }

  public getLanguages(): Observable<ServerResponse<Language>> {
    return this.common.getRequest<Language>("languages");
  }

  public addLanguage(name: string, acronym: string): Observable<ServerResponse<any>> {
    return this.common.postRequest<Language>("addLanguage", {name: name, acronym: acronym});
  }

  public updateLanguage(language: Language): Observable<ServerResponse<any>> {
    return this.common.postRequest<Language>("updateLanguage", {id: language.id, name: language.name, acronym: language.acronym});
  }

  public deleteLanguage(id: number): Observable<ServerResponse<any>> {
    return this.common.postRequest<Language>("deleteLanguage", {id: id});
  }
}
