import { TestBed } from '@angular/core/testing';
import { Key } from 'src/app/interfaces/key.interface';
import { Section } from 'src/app/interfaces/section.interface';

import { TranspilerService } from './transpiler.service';

describe('TranspilerService', () => {
  let service: TranspilerService;

  let testSection: Section[] = [
    { language: { id: 1, name: "English", acronym: "EN" }, json: { "TITLE": "title", "VALUE": { v1: "house", v2: "cat", v3: "round" } } },
    { language: { id: 2, name: "German", acronym: "DE" }, json: { "TITLE": "titel", "VALUE": { v1: "haus", v2: "katze", v4: "mehr" } } }
  ];

  let testKeys: Key[] = [{id: "id01", name: "t1", values: null, holder: true, keys: [
    {id: "id011", name: "t11", values: null, holder: true, keys: []},
    {id: "id012", name: "t12", values: null, holder: false, keys: []},
    {id: "id013", name: "t13", values: null, holder: true, keys: []},
    {id: "id014", name: "t14", values: null, holder: false, keys: []}
  ]}, 
  {id: "id02", name: "t2", values: null, holder: false, keys: []}];

  let testKeyJSON: Key[] = [
    {id: "id01", name: "t1", values: [{value: "test", language: testSection[0].language}], holder: false, keys: [] },
    {id: "id02", name: "t2", values: [{value: "house", language: testSection[0].language}], holder: false, keys: []}
  ];

  let testJSON: any = {
    t1: "test",
    t2: "house"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranspilerService);
  });

  it('test unifyAndTranspileJSONs', () => {
    let keys: Key[] = service.unifyAndTranspileJSONs(testSection);

    // check if the function expands the lists if they have intern differences
    expect(keys.length).toEqual(2);
    expect(keys[0].keys.length).toEqual(0);
    expect(keys[1].keys.length).toEqual(4);

    // check if the mapped values contain both translations
    expect(keys[0].values[0].value).toEqual("title");
    expect(keys[0].values[1].value).toEqual("titel");

    // check if missing key got replaced by an empty string
    expect(keys[1].keys[2].values[1].value).toEqual("");
  });

  it('test getFirstCheckableKey', () => {
    let checkableKey: Key = service.getFirstCheckableKey(testKeys, (_: Key) => true);
    expect(checkableKey.id).toEqual("id012");
  });

  it('test getNextCheckableKey', () => {
    let checkableKey: Key = service.getNextCheckableKey(testKeys, testKeys[0].keys[1], 1, (_: Key) => true);
    expect(checkableKey.id).toEqual("id014");
  });

  it('test keysToJSON', () => {
    let json: string = JSON.stringify(service.keysToJSON(testKeyJSON, 1));
    expect(json).toEqual(JSON.stringify(testJSON));
  });
});
