import { Injectable } from '@angular/core';
import { Key } from '../../../interfaces/key.interface';
import { Section } from '../../../interfaces/section.interface';

@Injectable({
  providedIn: 'root'
})
export class TranspilerService {

  constructor() { }

  public transpileJSON(json: any): Key[] {
    let keys: Key[] = [];

    const parts: string[] = this.iterateThroughKeys(json);
    parts.forEach(part => {
      keys.push({ name: part, value: this.escapeValue(json, part), keys: this.escapeRecursion(json, part) });
    });

    return keys;
  }

  private iterateThroughKeys(part: any): string[] {
    return Object.keys(part);
  }

  private escapeValue(json: any, part: string): string {
    return typeof json[part] == "string" ? json[part] : null;
  }

  private escapeRecursion(json: any, part: string): Key[] {
    return typeof json[part] == "string" ? [] : this.transpileJSON(json[part]);
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

  public unifyAndTranspileJSONs(sections: Section[]): Section[] {
    // unify all jsons
    for (let i = 0; i < sections.length; i++) {
      for (let a = 0; a < sections.length; a++) {
        if (a != i) {
          sections[i].json = this.unifyJSONs(sections[i].json, sections[a].json);
        }
      }
    }

    // transpiles all jsons 
    sections.map(section => {
      section.keys = this.transpileJSON(section.json);
    });

    return sections;
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
