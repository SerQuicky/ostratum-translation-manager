import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/interfaces/project.interface';
import { TranslationProject } from 'src/app/interfaces/translation.project.interface';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  @Output() execute = new EventEmitter<[boolean, Project | TranslationProject]>();
  @Input() project: TranslationProject | Project ;
  @Input() title: string;
  @Input() projectId?: number;
  @Input() acceptText: string;
  @Input() dismissText: string;
  @Input() acceptClass: string;

  // prevents that the real projects reference will be used
  public iProject: Project | TranslationProject;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.iProject = {id: this.project.id, 
      name: this.project.name, 
      description: this.project.description,
      projectId: this.projectId }
  }

  public executeEmitter(): void {
    this.execute.emit([true, this.iProject]);
  }
}
