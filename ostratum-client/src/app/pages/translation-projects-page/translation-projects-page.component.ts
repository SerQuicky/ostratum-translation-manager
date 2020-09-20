import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/communication/project/project.service';

@Component({
  selector: 'app-translation-projects-page',
  templateUrl: './translation-projects-page.component.html',
  styleUrls: ['./translation-projects-page.component.scss']
})
export class TranslationProjectsPageComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

}
