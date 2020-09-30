import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  @Output() execute = new EventEmitter<[boolean, string, string]>();
  @Input() title: string;
  @Input() titleValue: string;
  @Input() descriptionValue: string;
  @Input() acceptText: string;
  @Input() dismissText: string;
  @Input() acceptClass: string;

  constructor() { }

  ngOnInit(): void {
  }

  public executeEmitter(): void {
    this.execute.emit([true, this.titleValue, this.descriptionValue]);
  }

}
