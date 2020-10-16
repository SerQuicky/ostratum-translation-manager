import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/interfaces/language.interface';
import { TranslationService } from 'src/app/services/communication/translation/translation.service';

@Component({
  selector: 'app-translation-modal',
  templateUrl: './translation-modal.component.html',
  styleUrls: ['./translation-modal.component.scss']
})
export class TranslationModalComponent implements OnInit {

  @Output() execute = new EventEmitter<[boolean, Language]>();
  @Input() languages: Language[];
  @Input() title: string;
  @Input() acceptText: string;
  @Input() dismissText: string;
  @Input() acceptClass: string;

  public selectedLanguage: Language;
  public addEmptyLanguage: boolean = true;
  public fileName: string;

  constructor(public translate: TranslationService) { }

  ngOnInit(): void {
    console.log(this.languages);
  }

  public executeEmitter(): void {
    alert(this.selectedLanguage);
    //this.execute.emit([true, this.selectedLanguage]);
  }

  public onFileChanged(event: any): void {
    alert(event.target.files[0].name);
    this.fileName = event.target.files[0].name;
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, "UTF-8");
    fileReader.onload = () => {
      console.log(JSON.parse(fileReader.result + ""));
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
    console.log(event);
  }
}
