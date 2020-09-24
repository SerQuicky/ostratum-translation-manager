import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Translation } from 'src/app/interfaces/translation.interface';
import { Section } from 'src/app/interfaces/section.interface';

import { TranslationService } from 'src/app/services/communication/translation/translation.service';
import { TranspilerService } from 'src/app/services/others/transpiler/transpiler.service';
import { StorageService } from 'src/app/services/others/storage/storage.service';
import { Subscription } from 'rxjs';
import { Key } from 'src/app/interfaces/key.interface';

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
    public storageService: StorageService) { }

  ngOnInit(): void {
    this.translationProjectId = parseInt(this.route.snapshot.paramMap.get('tprojectId'));
    this.translationService.getTranslations(this.translationProjectId).subscribe(translations => {
      console.log(translations);
      this.translations = translations;

      // set sections
      let sections: Section[] = [];
      this.translations.forEach(translation => {
        sections.push({ language: translation.language, json: JSON.parse(translation.file) })
      });

      this.keys = this.transpilerService.unifyAndTranspileJSONs(sections);
      console.log(this.keys);
    });

    this.keySubscription = this.storageService.editKeySubject.subscribe(key => {
      console.log(key);
      this.showKeyTranslations(key);
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


}
