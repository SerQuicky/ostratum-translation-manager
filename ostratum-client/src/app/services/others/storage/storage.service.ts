import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Key } from 'src/app/interfaces/key.interface';
import { Section } from 'src/app/interfaces/section.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public keys: Key[] = [];
  public editKeySubject: Subject<Key> = new Subject();

  constructor() { }
}
