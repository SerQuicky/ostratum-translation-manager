import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  @Output() execute = new EventEmitter<[boolean, Project]>();
  @Input() project: Project;
  @Input() title: string;
  @Input() acceptText: string;
  @Input() dismissText: string;
  @Input() acceptClass: string;

  // prevents that the real projects reference will be used
  public iProject: Project;

  constructor() { }

  ngOnInit(): void {
    this.iProject = {id: this.project.id, name: this.project.name, description: this.project.description};
  }

  public executeEmitter(): void {
    this.execute.emit([true, this.iProject]);
  }
}
