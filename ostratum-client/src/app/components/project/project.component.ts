import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input() project: Project;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  public openTranslationProject(): void {
    this.router.navigate(['main/tprojects', this.project.id]);
  }

}
