import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Translation } from 'src/app/interfaces/translation.interface';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss']
})
export class SelectModalComponent implements OnInit {

  @Output() execute = new EventEmitter<[boolean, Translation]>();
  @Input() translations: Translation[];
  @Input() title: string;
  @Input() acceptText: string;
  @Input() dismissText: string;
  @Input() acceptClass: string;

  public selectedTranslation: Translation;

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    console.log(this.translations);
  }

  public executeEmitter(): void {
    this.selectedTranslation ? 
    this.execute.emit([true, this.selectedTranslation])
    : this.execute.emit([false, null]); 
  }

}
