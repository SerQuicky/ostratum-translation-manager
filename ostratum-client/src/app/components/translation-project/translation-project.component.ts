import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationProject } from 'src/app/interfaces/translation.project.interface';

@Component({
  selector: 'app-translation-project',
  templateUrl: './translation-project.component.html',
  styleUrls: ['./translation-project.component.scss']
})
export class TranslationProjectComponent implements OnInit {

  @Input("tproject") project: TranslationProject;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public openTranslations(): void {
    this.router.navigate(['main/translations', this.project.projectId]);
  }

}
