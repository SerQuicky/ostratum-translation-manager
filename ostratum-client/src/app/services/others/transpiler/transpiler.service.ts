import { Injectable } from '@angular/core';
import { Language } from 'src/app/interfaces/language.interface';
import { Key } from '../../../interfaces/key.interface';
import { Section } from '../../../interfaces/section.interface';

@Injectable({
  providedIn: 'root'
})
export class TranspilerService {

  constructor() { }

  public transpileJSON(json: any, language: Language): Key[] {
    let keys: Key[] = [];

    const parts: string[] = this.iterateThroughKeys(json);
    parts.forEach(part => {
      keys.push({ name: part, values: [{value: this.escapeValue(json, part), language: language}], keys: this.escapeRecursion(json, part, language)});
    });

    return keys;
  }

  public unifyKeys(mainKeys: Key[], subKeys: Key[]): Key[] {
    for(let i = 0; i < mainKeys.length; i++) {
      if(mainKeys[i].keys.length > 0) {
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

  private escapeRecursion(json: any, part: string, language: Language): Key[] {
    return typeof json[part] == "string" ? [] : this.transpileJSON(json[part], language);
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
      keys.push(this.transpileJSON(section.json, section.language));
    });

    console.log(keys);

    for(let u = 1; u < keys.length; u++) {
      keys[0] = this.unifyKeys(keys[0], keys[u]);
    }

    return keys[0];
  }

  public findKeyByName(keys: Key[], name: string): Key {
    for(let i = 0; i < keys.length; i++) {
      if(keys[i].name == name) {
        return keys[i];
      } else {
        const test = this.findKeyByName(keys[i].keys, name);
        if(test) {
          return test;
        }
      }
    }
  }
}
