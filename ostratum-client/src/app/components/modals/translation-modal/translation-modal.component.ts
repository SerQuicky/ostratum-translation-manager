import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/interfaces/language.interface';
import { File } from 'src/app/interfaces/file.interface';
import { ToastService } from 'src/app/services/others/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translation-modal',
  templateUrl: './translation-modal.component.html',
  styleUrls: ['./translation-modal.component.scss']
})
export class TranslationModalComponent implements OnInit {

  @Output() execute = new EventEmitter<[boolean, Language, File]>();
  @Input() languages: Language[];
  @Input() title: string;
  @Input() acceptText: string;
  @Input() dismissText: string;
  @Input() acceptClass: string;

  public selectedLanguage: Language;
  public addEmptyLanguage: boolean = true;
  public generatedFile: File = { name: "", file: "", type: "json"};

  constructor(public translate: TranslateService, private toastService: ToastService) {}

  ngOnInit(): void {
    console.log(this.languages);
  }

  public executeEmitter(): void {
    if(this.addEmptyLanguage && this.selectedLanguage)
      this.generatedFile = { name: this.selectedLanguage.acronym.toLowerCase() + ".json", file: "{}", type: "json"};

    this.selectedLanguage && this.generatedFile.file != "" ?
    this.execute.emit([true, this.selectedLanguage, this.generatedFile])
    : this.execute.emit([false, null, null]);
  }

  /**
  * get a json translation file
  */
  public onFileChanged(event: any): void {
    const fileReader: FileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");

    // success handler after file read
    fileReader.onload = () => {
      this.generatedFile = { name: event.target.files[0].name, file: fileReader.result + "", type: event.target.files[0].name.split(".")[1]};
    }

    // error handler after file read
    fileReader.onerror = (_) => {
      this.toastService.showToast(this.translate.instant("GENERAL.CODE_ERROR_FILE_READ"), this.translate.instant("GENERAL.CODE_ERROR_FILE_READ_DESC"), "alert-danger", "", 4000)
    }
  }
}
