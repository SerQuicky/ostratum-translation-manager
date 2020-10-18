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

import * as FileSaver from 'file-saver';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-translations-page',
  templateUrl: './translations-page.component.html',
  styleUrls: ['./translations-page.component.scss']
})
export class TranslationsPageComponent implements OnInit, OnDestroy {

  @ViewChild('search') searchbar: ElementRef;

  private translationProjectId: number;
  public translations: Translation[] = [];
  public languages: Language[] = [];

  // key data (chosen keys, all keys, etc.)
  public chosenKey: Key;
  public chosenKeyId: string = null;
  public keys: Key[] = [];
  private keySubscription: Subscription;

  // translation keys filter and search
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
    // retrieve the translation project id, so the translations of this project can be received
    this.translationProjectId = parseInt(this.route.snapshot.paramMap.get('tprojectId'));

    // load all possible languages and get the current translations
    this.loadLanguages();
    this.loadTranslations();

    this.keySubscription = this.storageService.editKeySubject.subscribe(key => {
      this.showKeyTranslations(key);
    });
  }


  /* ---------------------------------------------------------------------------------------------------
  *                        REST-Translation calls
  * --------------------------------------------------------------------------------------------------- */

  /**
  * Get and save all possible languages
  */
  private loadLanguages(): void {
    this.languageService.getLanguages().subscribe(response => this.languages = response.value);
  }


  /**
  * Get, Save and Convert the translations to a key tree data structure
  */
  private loadTranslations(): void {
    this.translationService.getTranslations(this.translationProjectId).subscribe(response => {
      this.translations = response.value ? response.value : [];

      // set sections for the convertion
      let sections: Section[] = [];
      this.translations.forEach(translation => {
        sections.push({ language: translation.language, json: JSON.parse(translation.file) });
      });

      // unify and convert the all translation into the key data structure
      this.keys = this.transpilerService.unifyAndTranspileJSONs(sections);
    });
  }

  /**
  * Update / Save the current state of the translations
  */
  public saveTranslations(): void {
    let values: [number, string][] = [];
    this.storageService.updateTranslationCounter.next();

    this.translations.forEach((translation: Translation) => {
      values.push([translation.id, JSON.stringify(this.transpilerService.keysToJSON(this.keys, translation.language.id))]);
    });

    this.translationService.updateTranslation(values).subscribe(_ => {
      this.loadTranslations();
    });
  }

  /* ---------------------------------------------------------------------------------------------------
  *                        Modal calls
  * --------------------------------------------------------------------------------------------------- */

  /**
  * Open a modal that can create a new translation for the translation project
  */
  public openAddNewTranslationModal(): void {
    this.languageService.getLanguages().subscribe(response => {
      const component: ComponentRef<TranslationModalComponent> = this.modalService.createTranslationModal(
        response.value,
        this.translate.instant("TRANSLATION.ADD_TRANSLATION"),
        this.translate.instant("MODAL.CREATE"),
        this.translate.instant("MODAL.CANCEL"),
        "btn btn-success");

      component.instance.execute.subscribe((data: [boolean, Language, File]) => {
        if (data[0]) {
          // check if the language already exists, if not the new translation will be created
          !this.translations.some((translation: Translation) => translation.language.id == data[1].id) ?
            this.translationService.addTranslation(data[2], data[1].id, this.translationProjectId).subscribe(_ => {
              this.loadTranslations();
              this.chosenKey = null;
            })
            : this.toastService.showToast(this.translate.instant("GENERAL.CODE_ERROR_ADD_TRANSLATION_EXISTS"), this.translate.instant("GENERAL.CODE_ERROR_ADD_TRANSLATION_EXISTS_DESC"), "alert-danger", "", 4500);
        } else {
          // a toast will be shown, if not all information of the modal are valid
          this.toastService.showToast(this.translate.instant("GENERAL.CODE_ERROR_ADD_TRANSLATION"), this.translate.instant("GENERAL.CODE_ERROR_ADD_TRANSLATION_DESC"), "alert-danger", "", 4500)
        }
        this.modalService.destroyModal(component);
      });
    })
  }

  /**
  * Open a select modal for the deletion of a translation
  */
  public openDeleteTranslationModal(): void {
    const component: ComponentRef<SelectModalComponent<Translation>> = this.modalService.createSelectModal<Translation>(
      this.translations,
      this.translations.map((translation: Translation) => 'LANGUAGE.KEYS.' +  translation.language.acronym),
      this.translate.instant("TRANSLATION.DELETE_TRANSLATION"),
      this.translate.instant("MODAL.DELETE"),
      this.translate.instant("MODAL.CANCEL"),
      "btn btn-danger");

    component.instance.execute.subscribe((data: [boolean, Translation]) => {
      if (data[0]) {
        this.translationService.deleteTranslation(data[1].id).subscribe(_ => this.loadTranslations());
        this.chosenKey = null;
      } else {
        this.toastService.showToast(this.translate.instant("GENERAL.CODE_ERROR_DELETE_TRANSLATION"), this.translate.instant("GENERAL.CODE_ERROR_DELETE_TRANSLATION_DESC"), "alert-danger", "", 4500)
      }
      this.modalService.destroyModal(component);
    });
  }

  /* ---------------------------------------------------------------------------------------------------
  *             Helper functions (key input handling, download translations, etc.)
  * --------------------------------------------------------------------------------------------------- */

  /**
  * Map an acronym to a flag icon (special case for EN to GB...)
  */
  public showKeyTranslations(key: Key): void {
    this.storageService.updateTranslationCounter.next();
    this.chosenKey = key;
    this.chosenKeyId = this.chosenKey.id;
  }


  /**
  * Map an acronym to a flag icon (special case for EN to GB...)
  */
  public resolveCountryFlagSVG(acronym: string): string {
    return "http://catamphetamine.gitlab.io/country-flag-icons/3x2/" + (acronym == "EN" ? "GB" : acronym) + ".svg"
  }

  /**
  * key inputs for the translation key handling
  */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
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

  /**
  * Check if some subkey of a key has an empty value
  * @param icrement the direction in which the chosen key should be changed
  */
  private selectKeyByKeyboard(icrement: number): void {
    if (this.chosenKey) {
      const switchedKey: Key = this.transpilerService.getNextCheckableKey(this.keys, this.chosenKey, icrement, this.showMissingTranslations ? this.switchToOnlyMissingTranslations : this.switchOnKey);

      if (switchedKey) {
        this.showKeyTranslations(switchedKey);
      }

    } else {
      const switchedKey: Key = this.transpilerService.getFirstCheckableKey(this.keys, this.showMissingTranslations ? this.switchToOnlyMissingTranslations : this.switchOnKey);
      if (switchedKey) {
        this.showKeyTranslations(switchedKey);
      }
    }
  }

  /**
  * Check if some subkey of a key has an empty value
  */
  private switchToOnlyMissingTranslations(key: Key): boolean {
    return key.values.some(value => value.value == "");
  }

  private switchOnKey(key: Key): boolean {
    return true;
  }

  /**
  * Download the translation (jsons) as a zip
  */
  public downloadFileExample(): void {
    const jszip = new JSZip();
    this.translations.forEach((translation: Translation) => {
      jszip.file(translation.language.acronym.toLowerCase() + ".json", JSON.stringify(this.transpilerService.keysToJSON(this.keys, translation.language.id)));
    });

    jszip.generateAsync({ type: 'blob' }).then(function (content) {
      FileSaver.saveAs(content, 'translations.zip')
    });
  }

  ngOnDestroy(): void {
    this.keySubscription.unsubscribe();
  }
}
