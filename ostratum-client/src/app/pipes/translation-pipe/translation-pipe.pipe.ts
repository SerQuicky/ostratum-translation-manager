import { Pipe, PipeTransform } from '@angular/core';
import { Key } from 'src/app/interfaces/key.interface';

@Pipe({
  name: 'translationPipe',
  pure: false
})
export class TranslationPipePipe implements PipeTransform {

  transform(keys: Key[], searchtext: string, showMissingTranslations: boolean): unknown {

    if (!keys) {
      return keys;
    }

    keys = this.analyseKeys(keys, showMissingTranslations, searchtext);
    return keys;
  }

  /**
  * Get, Save and Convert the translations to a key tree data structure
  */
  private analyseKeys(keys: Key[], showMissingTranslations: boolean, searchtext: string): Key[] {
    if (showMissingTranslations) {
      return keys.filter(key => {
        const missingResult: boolean = key.holder ? this.checkMissingKeysInHolder(key.keys) : this.checkMissingKeyInNonHolder(key);
        return missingResult && (this.filterString(key.name, searchtext) || this.filterKeys(key.keys, searchtext))
      });
    } else {
      return keys.filter(key => {
        return this.filterString(key.name, searchtext) || this.filterKeys(key.keys, searchtext)
      });
    }
  }

  /**
  * filter function for the keys
  */
  private filterKeys(keys: Key[], searchtext: string): boolean {
    return keys.some(key => (this.filterString(key.name, searchtext) || this.filterKeys(key.keys, searchtext)));
  }

  /**
  * check if the translation key misses a translation of the key
  */
  private checkMissingKeysInHolder(keys: Key[]): boolean {
    return keys.some(key => key.values.filter(value => value.value == "").length > 0 || this.checkMissingKeysInHolder(key.keys));
  }

  /**
  * check if the translation key misses a translation of the key
  */
  private checkMissingKeyInNonHolder(key: Key): boolean {
    return key.values.filter(value => value.value == "").length > 0;
  }


  /**
  * determines if the value contains the searchtext
  */
  private filterString(value: string, searchtext: string): boolean {
    return value
      .toString()
      .toLowerCase()
      .includes(searchtext.toLowerCase())
  }

}
