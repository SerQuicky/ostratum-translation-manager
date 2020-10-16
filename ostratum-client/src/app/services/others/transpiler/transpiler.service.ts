import { Injectable } from '@angular/core';
import { Language } from 'src/app/interfaces/language.interface';
import { Key } from '../../../interfaces/key.interface';
import { Section } from '../../../interfaces/section.interface';

@Injectable({
  providedIn: 'root'
})
export class TranspilerService {

  constructor() { }

  public transpileJSON(json: any, language: Language, baseId: string): Key[] {
    let keys: Key[] = [];

    const parts: string[] = this.iterateThroughKeys(json);
    for (let i = 0; i < parts.length; i++) {
      keys.push({ id: baseId + i, name: parts[i], values: [{ value: this.escapeValue(json, parts[i]), language: language }], holder: typeof json[parts[i]] == "object", keys: this.escapeRecursion(json, parts[i], language, baseId + i) });
    }

    return keys;
  }

  public unifyKeys(mainKeys: Key[], subKeys: Key[]): Key[] {
    for (let i = 0; i < mainKeys.length; i++) {
      if (mainKeys[i].keys.length > 0) {
        this.unifyKeys(mainKeys[i].keys, subKeys[i].keys);
      } else {
        mainKeys[i].values.push(subKeys[i].values[0]);
      }
    }

    return mainKeys;
  }

  public unifyJSONs(json1: any, json2: any): any {
    const parts: string[] = this.iterateThroughKeys(json2);
    parts.forEach(part => {
      if (part in json1 && typeof json2[part] == "object") {
        json1[part] = this.unifyJSONs(json1[part], json2[part]);
      } else if (!(part in json1) && typeof json2[part] == "object") {
        json1[part] = this.unifyJSONs({}, json2[part]);
      } else if (!(part in json1)) {
        json1[part] = "";
      }
    });

    return json1;
  }

  private iterateThroughKeys(part: any): string[] {
    return Object.keys(part);
  }

  private escapeValue(json: any, part: string): string {
    return typeof json[part] == "string" ? json[part] : null;
  }

  private escapeRecursion(json: any, part: string, language: Language, baseId: string): Key[] {
    return typeof json[part] == "string" ? [] : this.transpileJSON(json[part], language, baseId);
  }


  public unifyAndTranspileJSONs(sections: Section[]): Key[] {
    // unify all jsons
    for (let i = 0; i < sections.length; i++) {
      for (let a = 0; a < sections.length; a++) {
        if (a != i) {
          sections[i].json = this.unifyJSONs(sections[i].json, sections[a].json);
        }
      }
    }

    let keys: Key[][] = [];
    sections.forEach(section => {
      keys.push(this.transpileJSON(section.json, section.language, "id"));
    });

    console.log(keys);

    for (let u = 1; u < keys.length; u++) {
      keys[0] = this.unifyKeys(keys[0], keys[u]);
    }

    return keys[0];
  }

  public updateKey(keys: Key[], key: Key): Key[] {
    keys.forEach(subKey => {
      if (subKey.holder) {
        subKey.keys = this.updateKey(subKey.keys, key);
      } else if (subKey.id == key.id) {
        subKey = key;
      }
    })

    return keys;
  }

  public getFirstCheckableKey(keys: Key[], onlyMissingTranslations: boolean): Key {
    const keyList: Key[] = this.keysToDimensionList(keys);
    for(let i = 0; i < keyList.length; i++) {
      if(!keyList[i].holder && keyList[i].values.some(value => value.value == "")) {
        return keyList[i];
      }
    }
  }

  public getNextCheckableKey(keys: Key[], chosenKey: Key, increment: number, func: (key: Key) => boolean): Key {
    const keyList: Key[] = this.keysToDimensionList(keys);
    let index: number = keyList.indexOf(chosenKey);
    for(let i = index; i < keyList.length && i >= 0; i+= increment) {
      if(keyList[i] && !keyList[i].holder && i != index && func(keyList[i])) {
        return keyList[i];
      }
    }
  }

  private keysToDimensionList(keys: Key[]): Key[] {
    let result: Key[] = [];

    for(let i = 0; i < keys.length; i++) {
      if(keys[i].holder) {
        result = result.concat(this.keysToDimensionList(keys[i].keys));
      } else {
        result.push(keys[i]);
      }
    }

    return result;
  }

  public keysToJSON(keys: Key[], id: number): any {
    let json = {};

    keys.forEach(key => {
      if(key.holder) {
        json[key.name] = this.keysToJSON(key.keys, id);
      } else {
        json[key.name] = key.values.find(value => value.language.id == id).value;
      }
    });

    return json;
  }


}
