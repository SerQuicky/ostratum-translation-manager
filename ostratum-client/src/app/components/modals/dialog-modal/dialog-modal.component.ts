import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss']
})
export class DialogModalComponent implements OnInit {

  @Output() execute = new EventEmitter<boolean>();
  @Input() title: string;
  @Input() description: string;
  @Input() acceptText: string;
  @Input() dismissText: string;
  @Input() acceptClass: string;

  constructor() { }

  ngOnInit(): void {}

  public executeEmitter(): void {
    this.execute.emit(true);
  }

}
