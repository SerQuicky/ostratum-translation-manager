import { Component, ComponentRef, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Translation } from 'src/app/interfaces/translation.interface';
import { Section } from 'src/app/interfaces/section.interface';

import { TranslationService } from 'src/app/services/communication/translation/translation.service';
import { TranspilerService } from 'src/app/services/others/transpiler/transpiler.service';
import { StorageService } from 'src/app/services/others/storage/storage.service';
import { Subscription } from 'rxjs';
import { Key } from 'src/app/interfaces/key.interface';
import { TranslateService } from '@ngx-translate/core';
import { TranslationModalComponent } from 'src/app/components/modals/translation-modal/translation-modal.component';
import { ModalService } from 'src/app/services/others/modal/modal.service';
import { LanguageService } from 'src/app/services/communication/language/language.service';
import { ToastService } from 'src/app/services/others/toast/toast.service';
import { Language } from 'src/app/interfaces/language.interface';
import { File } from 'src/app/interfaces/file.interface';
import { SelectModalComponent } from 'src/app/components/modals/select-modal/select-modal.component';

@Component({
  selector: 'app-translations-page',
  templateUrl: './translations-page.component.html',
  styleUrls: ['./translations-page.component.scss']
})
export class TranslationsPageComponent implements OnInit, OnDestroy {

  @ViewChild('search') searchbar: ElementRef;

  private translationProjectId: number;
  public translations: Translation[] = [];
  public chosenKey: Key;
  public chosenKeyId: string = null;
  public keys: Key[] = [];
  private keySubscription: Subscription;

  public searchbarValue: string = "";
  public showMissingTranslations: boolean = false;

  constructor(private translationService: TranslationService,
    private route: ActivatedRoute,
    private transpilerService: TranspilerService,
    public storageService: StorageService,
    public translate: TranslateService,
    private modalService: ModalService,
    private toastService: ToastService,
    private languageService: LanguageService) { }

  ngOnInit(): void {
    this.translationProjectId = parseInt(this.route.snapshot.paramMap.get('tprojectId'));
    this.loadTranslations();

    this.keySubscription = this.storageService.editKeySubject.subscribe(key => {
      console.log(key);
      this.showKeyTranslations(key);
    });
  }

  private loadTranslations(): void {
    this.translationService.getTranslations(this.translationProjectId).subscribe(reponse => {
      console.log(reponse);
      this.translations = reponse.value;

      // set sections
      let sections: Section[] = [];
      this.translations.forEach(translation => {
        sections.push({ language: translation.language, json: JSON.parse(translation.file) })
      });

      this.keys = this.transpilerService.unifyAndTranspileJSONs(sections);
      console.log(this.keys);
    });
  }

  public showKeyTranslations(key: Key): void {
    this.storageService.updateTranslationCounter.next();
    this.chosenKey = key;
    this.chosenKeyId = this.chosenKey.id;
  }

  public test(): void {
    console.log(this.keys);
    this.storageService.updateTranslationCounter.next();
    console.log(this.transpilerService.keysToJSON(this.keys, "EN"));
  }

  public resolveCountryFlagSVG(acronym: string): string {
    let rAcronym: string = acronym == "EN" ? "GB" : acronym;
    return "http://catamphetamine.gitlab.io/country-flag-icons/3x2/" + rAcronym + ".svg"
  }

  ngOnDestroy(): void {
    this.keySubscription.unsubscribe();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event.key);
    if (event.key === "ArrowUp") {
      this.selectKeyByKeyboard(-1);
    } else if (event.key === "ArrowDown") {
      this.selectKeyByKeyboard(1);
    } else if (event.key === "Dead") {
      this.searchbar.nativeElement.focus();
    } else if (event.key === "Escape") {
      this.searchbar.nativeElement.blur();
    }
  }

  private selectKeyByKeyboard(icrement: number): void {
    if (this.chosenKey) {
      const switchedKey: Key = this.transpilerService.getNextCheckableKey(this.keys,
        this.chosenKey,
        icrement,
        this.showMissingTranslations ? this.switchToOnlyMissingTranslations : (_: Key) => true);

      if (switchedKey) {
        this.showKeyTranslations(switchedKey);
      } else {
        alert('uff');
      }

    } else {
      const switchedKey: Key = this.transpilerService.getFirstCheckableKey(this.keys, this.showMissingTranslations);
      if (switchedKey) {
        this.showKeyTranslations(switchedKey);
      } else {
        alert('uff');
      }
    }
  }

  private switchToOnlyMissingTranslations(key: Key): boolean {
    return key.values.some(value => value.value == "");
  }

  public openAddNewTranslationModal(): void {
    this.languageService.getLanguages().subscribe(response => {
      const component: ComponentRef<TranslationModalComponent> = this.modalService.createTranslationModal(
        response.value,
        this.translate.instant("TRANSLATION.ADD_TRANSLATION"),
        this.translate.instant("MODAL.CREATE"),
        this.translate.instant("MODAL.CANCEL"),
        "btn btn-success");

      component.instance.execute.subscribe((data: [boolean, Language, File]) => {
        console.log(data);
        if (data[0]) {
          !this.translations.some((translation: Translation) => translation.language.id == data[1].id) ?
            this.translationService.addTranslation(data[2], data[1].id, this.translationProjectId).subscribe(_ => this.loadTranslations())
            : this.toastService.showToast(this.translate.instant("GENERAL.CODE_ERROR_ADD_TRANSLATION_EXISTS"), this.translate.instant("GENERAL.CODE_ERROR_ADD_TRANSLATION_EXISTS_DESC"), "alert-danger", "", 4500)
        } else {
          this.toastService.showToast(this.translate.instant("GENERAL.CODE_ERROR_ADD_TRANSLATION"), this.translate.instant("GENERAL.CODE_ERROR_ADD_TRANSLATION_DESC"), "alert-danger", "", 4500)
        }
        component.destroy();
      });
    })
  }

  public openDeleteTranslationModal(): void {
    const component: ComponentRef<SelectModalComponent> = this.modalService.createSelectModal(
      this.translations,
      this.translate.instant("TRANSLATION.DELETE_TRANSLATION"),
      this.translate.instant("MODAL.DELETE"),
      this.translate.instant("MODAL.CANCEL"),
      "btn btn-danger");

    component.instance.execute.subscribe((data: [boolean, Translation]) => {
      if (data[0]) {
        this.translationService.deleteTranslation(data[1].id).subscribe(_ => this.loadTranslations());
      } else {
        this.toastService.showToast(this.translate.instant("GENERAL.CODE_ERROR_DELETE_TRANSLATION"), this.translate.instant("GENERAL.CODE_ERROR_DELETE_TRANSLATION_DESC"), "alert-danger", "", 4500)
      }
      component.destroy();
    });
  }
}
