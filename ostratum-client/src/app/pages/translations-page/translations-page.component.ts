import { Component, OnDestroy, OnInit } from '@angular/core';
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

  private translationProjectId: number;
  public translations: Translation[] = [];
  public chosenKey: Key;
  private keySubscription: Subscription;

  constructor(private translationService: TranslationService, private route: ActivatedRoute, private transpilerService: TranspilerService, public storageService: StorageService) { }

  ngOnInit(): void {
    this.translationProjectId = parseInt(this.route.snapshot.paramMap.get('tprojectId'));
    this.translationService.getTranslations(this.translationProjectId).subscribe(translations => {
      console.log(translations);
      this.translations = translations;

      // set sections
      let sections: Section[] = [];
      this.translations.forEach(translation => {
        sections.push({language: translation.language, json: JSON.parse(translation.file)})
      });
    
      this.storageService.keys = this.transpilerService.unifyAndTranspileJSONs(sections);
    });

    this.keySubscription = this.storageService.editKeySubject.subscribe(key => {
      console.log(key);
      this.showKeyTranslations(key);
    });
  }

  public showKeyTranslations(key: Key): void {
    console.log(key);
    this.chosenKey = key;
/*     this.sections = [];
    this.storageService.sections.forEach(section => {
      this.transpilerService.findKeyByName(section.keys, key.name)
      this.sections.push({language: section.language, json: "", keys: [this.transpilerService.findKeyByName(section.keys, key.name)]});
    }) */
  }

  ngOnDestroy(): void {
    this.keySubscription.unsubscribe();
  }

}
