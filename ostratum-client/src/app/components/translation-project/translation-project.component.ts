import { Component, Input, OnInit } from '@angular/core';
import { TranslationProject } from 'src/app/interfaces/translation.project.interface';

@Component({
  selector: 'app-translation-project',
  templateUrl: './translation-project.component.html',
  styleUrls: ['./translation-project.component.scss']
})
export class TranslationProjectComponent implements OnInit {

  @Input("tproject") project: TranslationProject;

  constructor() { }

  ngOnInit(): void {
  }

}
