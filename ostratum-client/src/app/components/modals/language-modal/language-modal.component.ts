import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/interfaces/language.interface';

@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.scss']
})
export class LanguageModalComponent implements OnInit {

  @Output() execute = new EventEmitter<[boolean, Language]>();
  @Input() language: Language;
  @Input() title: string;
  @Input() acceptText: string;
  @Input() dismissText: string;
  @Input() acceptClass: string;

  public iLanguage: Language;
  constructor() { }

  ngOnInit(): void {
    this.iLanguage = {
      id: this.language.id, 
      name: this.language.name, 
      acronym: this.language.acronym }
  }

  public executeEmitter(): void {
    this.execute.emit([true, this.iLanguage]);
  }

}
