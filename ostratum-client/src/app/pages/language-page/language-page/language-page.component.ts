import { Component, ComponentRef, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/others/storage/storage.service';
import { LanguageService } from 'src/app/services/communication/language/language.service';
import { Language } from 'src/app/interfaces/language.interface';
import { LanguageModalComponent } from 'src/app/components/modals/language-modal/language-modal.component';
import { ModalService } from 'src/app/services/others/modal/modal.service';
import { ToastService } from 'src/app/services/others/toast/toast.service';
import { DialogModalComponent } from 'src/app/components/modals/dialog-modal/dialog-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-page',
  templateUrl: './language-page.component.html',
  styleUrls: ['./language-page.component.scss']
})
export class LanguagePageComponent implements OnInit {

  public languages: Language[] = [];

  constructor(private storageService: StorageService,
    private languageService: LanguageService,
    private modalService: ModalService,
    private toastService: ToastService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.storageService.initSidebar(4);
    this.loadLanguages();
  }

  public openAddNewLanguageModal(): void {
    const component: ComponentRef<LanguageModalComponent> = this.modalService.createLanguageModal(
      { id: 0, name: "", acronym: "" },
      this.translate.instant("LANGUAGE.ADD"),
      this.translate.instant("MODAL.CREATE"),
      this.translate.instant("MODAL.CANCEL"),
      "btn btn-success");

    component.instance.execute.subscribe(data => {
      if (data[0]) {
        const language: Language = data[1];
        this.languageService.addLanguage(language.name, language.acronym).subscribe(res => {
          this.toastService.determineToast(res, "TOAST.LANGUAGE_CREATED");
          this.loadLanguages();
        });
      }
      component.destroy();
    });
  }

  public openEditLanguageModal(language: Language): void {
    const component: ComponentRef<LanguageModalComponent> = this.modalService.createLanguageModal(
      language, 
      this.translate.instant("LANGUAGE.UPDATE", {name: language.name}),
      this.translate.instant("MODAL.SAVE"),
      this.translate.instant("MODAL.CANCEL"),
      "btn btn-success");

    component.instance.execute.subscribe(data => {
      if (data[0]) {
        const language: Language = data[1];
        this.languageService.updateLanguage(language).subscribe(res => {
          this.toastService.determineToast(res, "TOAST.LANGUAGE_DELETED");
          this.loadLanguages();
        });
      }
      component.destroy();
    });
  }

  public openDeleteLanguageModal(language: Language): void {
    let component: ComponentRef<DialogModalComponent> = this.modalService.createDialogModal(
      this.translate.instant("LANGUAGE.DELETE", {name: language.name}),
      this.translate.instant("LANGUAGE.DELETE_DESCRIPTION", {name: language.name}),
      this.translate.instant("MODAL.DELETE"),
      this.translate.instant("MODAL.CANCEL"),
      "btn btn-danger");

    component.instance.execute.subscribe(success => {
      if (success) {
        this.languageService.deleteLanguage(language.id).subscribe(response => {
          this.toastService.determineToast(response, "TOAST.LANGUAGE_UPDATED");
          this.loadLanguages();
        });
      }
    });
  }

  private loadLanguages(): void {
    this.languageService.getLanguages().subscribe(response => {
      this.languages = response.value;
    })
  }

}
