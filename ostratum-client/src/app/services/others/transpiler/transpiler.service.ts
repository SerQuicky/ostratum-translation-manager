import { Injectable } from '@angular/core';
import { Language } from 'src/app/interfaces/language.interface';
import { Key } from '../../../interfaces/key.interface';
import { Section } from '../../../interfaces/section.interface';

@Injectable({
  providedIn: 'root'
})
export class TranspilerService {

  constructor() { }

  /* ---------------------------------------------------------------------------------------------------
  *                       Generate, Unify, Convert jsons to key lists
  * --------------------------------------------------------------------------------------------------- */

  /**
  * converts a list of sections to a list of keys
  * @param sections list of sections (mapping of json to a language)
  * @return a list of keys
  */
  public unifyAndTranspileJSONs(sections: Section[]): Key[] {
    // unify the jsons of the sections to a uniformed base (every json has got the keys and subkeys of the other)
    for (let i = 0; i < sections.length; i++) {
      for (let a = 0; a < sections.length; a++) {
        if (a != i) {
          sections[i].json = this.sortJSON(this.unifyJSONs(sections[i].json, sections[a].json));
        }
      }
    }

    // convert the jsons of the sections to a tree based data structure (key.interface)
    let keys: Key[][] = [];
    sections.forEach(section => {
      keys.push(this.transpileJSON(section.json, section.language, "id"));
    });


    // unify the generated data structures as one
    for (let u = 1; u < keys.length; u++) {
      keys[0] = this.unifyKeys(keys[0], keys[u]);
    }

    return keys[0];
  }

  /**
  * Convert a json to a key list (data structure)
  * @param json the translation json value
  * @param language the language of the translation
  * @param baseId base id of the section
  * @return a list of keys
  */
  private transpileJSON(json: any, language: Language, baseId: string): Key[] {
    let keys: Key[] = [];

    const parts: string[] = this.iterateThroughKeys(json);
    for (let i = 0; i < parts.length; i++) {
      keys.push({ id: baseId + i, name: parts[i], values: [{ value: this.escapeValue(json, parts[i]), language: language }], holder: typeof json[parts[i]] == "object", keys: this.escapeRecursion(json, parts[i], language, baseId + i) });
    }

    return keys;
  }

  /**
  * Convert a json to a key list (data structure)
  * @param mainKeys top level keys
  * @param subKeys child keys of the top level key
  * @return unified list of keys
  */
  private unifyKeys(mainKeys: Key[], subKeys: Key[]): Key[] {
    for (let i = 0; i < mainKeys.length; i++) {
      if (mainKeys[i].keys.length > 0) {
        this.unifyKeys(mainKeys[i].keys, subKeys[i].keys);
      } else {
        mainKeys[i].values.push(subKeys[i].values[0]);
      }
    }

    return mainKeys;
  }

  /**
  * Take two jsons and create a json that has the same base (common ground)
  * @param json1 first json
  * @param json2 second json
  * @return unified json
  */
  private unifyJSONs(json1: any, json2: any): any {
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

  /* ---------------------------------------------------------------------------------------------------
  *                       Helper function for the handling of the jsons
  * --------------------------------------------------------------------------------------------------- */

  private iterateThroughKeys(part: any): string[] {
    return Object.keys(part);
  }

  private escapeValue(json: any, part: string): string {
    return typeof json[part] == "string" ? json[part] : null;
  }

  private escapeRecursion(json: any, part: string, language: Language, baseId: string): Key[] {
    return typeof json[part] == "string" ? [] : this.transpileJSON(json[part], language, baseId);
  }

  private sortJSON(json: any): any {
    const parts: string[] = this.iterateThroughKeys(json);
    parts.forEach(part => {
      if (typeof json[part] == "object") {
        json[part] = this.sortJSON(json[part]);
      }
    });

    return Object.entries(json).sort().reduce((o, [k, v]) => (o[k] = v, o), {});
  }

  /* ---------------------------------------------------------------------------------------------------
  *                       Key handling (update, iterate, etc.)
  * --------------------------------------------------------------------------------------------------- */

  /**
  * update a key in a key list
  * @param keys list of all keys that contains the key that should be updated
  * @param key new key
  * @return updated key list
  */
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

  /**
  * update a key in a key list
  * @param keys list of all keys that contains the key that should be updated
  * @param func higher order function to determine which keys are valid
  * @return get first chooseable key
  */
  public getFirstCheckableKey(keys: Key[], func: (key: Key) => boolean): Key {
    const keyList: Key[] = this.keysToDimensionList(keys);
    for (let i = 0; i < keyList.length; i++) {
      if (!keyList[i].holder && func(keyList[i])) {
        return keyList[i];
      }
    }
  }

  /**
  * Get the next key in the key list by an increment directions
  * @param keys key list
  * @param chosenKey current chosen key
  * @param increment direction in which the key should be changed (down or up)
  * @param func higher order function to determine which keys are valid
  * @return new chosen key list
  */
  public getNextCheckableKey(keys: Key[], chosenKey: Key, increment: number, func: (key: Key) => boolean): Key {
    const keyList: Key[] = this.keysToDimensionList(keys);
    let index: number = keyList.indexOf(chosenKey);
    for (let i = index; i < keyList.length && i >= 0; i += increment) {
      if (keyList[i] && !keyList[i].holder && i != index && func(keyList[i])) {
        return keyList[i];
      }
    }
  }

  /**
  * Convert a key list which is a tree data structure in a single dimension key list
  * @param keys key list
  * @return one dimensional key list
  */
  private keysToDimensionList(keys: Key[]): Key[] {
    let result: Key[] = [];

    for (let i = 0; i < keys.length; i++) {
      if (keys[i].holder) {
        result = result.concat(this.keysToDimensionList(keys[i].keys));
      } else {
        result.push(keys[i]);
      }
    }

    return result;
  }

  /**
  * Convert a list of keys to language json
  * @param keys list of all keys that contains the key that should be updated
  * @param id language id key
  * @return language json
  */
  public keysToJSON(keys: Key[], id: number): any {
    let json = {};

    keys.forEach(key => {
      key.holder ?
        json[key.name] = this.keysToJSON(key.keys, id)
        : json[key.name] = key.values.find(value => value.language.id == id).value
    });

    return json;
  }


}
