import { Component, ComponentRef, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/others/storage/storage.service';
import { LanguageService } from 'src/app/services/communication/language/language.service';
import { Language } from 'src/app/interfaces/language.interface';
import { LanguageModalComponent } from 'src/app/components/modals/language-modal/language-modal.component';
import { ModalService } from 'src/app/services/others/modal/modal.service';
import { ToastService } from 'src/app/services/others/toast/toast.service';
import { DialogModalComponent } from 'src/app/components/modals/dialog-modal/dialog-modal.component';

@Component({
  selector: 'app-language-page',
  templateUrl: './language-page.component.html',
  styleUrls: ['./language-page.component.scss']
})
export class LanguagePageComponent implements OnInit {

  public languages: Language[] = [];

  constructor(private storageService: StorageService, private languageService: LanguageService, private modalService: ModalService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.storageService.initSidebar(4);
    this.loadLanguages();
  }

  public openAddNewLanguageModal(): void {
    const component: ComponentRef<LanguageModalComponent> = this.modalService.createLanguageModal(
      { id: 0, name: "", acronym: "" }, "Add new language",
      "Create", "Cancel", "btn btn-success");

    component.instance.execute.subscribe(data => {
      if (data[0]) {
        const language: Language = data[1];
        this.languageService.addLanguage(language.name, language.acronym).subscribe(res => {
          this.toastService.determineToast(res);
          this.loadLanguages();
        });
      }
      component.destroy();
    });
  }

  public openEditLanguageModal(language: Language): void {
    const component: ComponentRef<LanguageModalComponent> = this.modalService.createLanguageModal(
      language, "Update language",
      "Save", "Cancel", "btn btn-success");

    component.instance.execute.subscribe(data => {
      if (data[0]) {
        const language: Language = data[1];
        this.languageService.updateLanguage(language).subscribe(res => {
          this.toastService.determineToast(res);
          this.loadLanguages();
        });
      }
      component.destroy();
    });
  }

  public openDeleteLanguageModal(language: Language): void {
    let component: ComponentRef<DialogModalComponent> = this.modalService.createDialogModal(
      "Delete the language " + language.name,
      "Are you sure, that you want to delete " + language.name + " this process can not be reverted!",
      "Delete", "Cancel",
      "btn btn-danger");

    component.instance.execute.subscribe(success => {
      if (success) {
        this.languageService.deleteLanguage(language.id).subscribe(response => {
          this.toastService.determineToast(response, "SUCCESSFULLY DELETED Language");
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
