import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Translation } from 'src/app/interfaces/translation.interface';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss']
})
export class SelectModalComponent<T> implements OnInit {

  @Output() execute = new EventEmitter<[boolean, T]>();
  @Input() objects: T[];
  @Input() values: string[];
  @Input() title: string;
  @Input() acceptText: string;
  @Input() dismissText: string;
  @Input() acceptClass: string;

  public selectedIndex: number;

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {}

  public executeEmitter(): void {
    this.selectedIndex ? 
    this.execute.emit([true, this.objects[this.selectedIndex]])
    : this.execute.emit([false, null]); 
  }

}
