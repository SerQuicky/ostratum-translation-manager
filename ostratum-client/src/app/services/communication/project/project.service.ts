import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonCommunication } from '../common.communication';
import { Project } from '../../../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private common: CommonCommunication) { }

  public getProjects(): Observable<Project[]> {
    return this.common.getRequest("userProjects");
  }
}
