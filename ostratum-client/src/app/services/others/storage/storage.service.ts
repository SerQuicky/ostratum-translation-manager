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
  public updateTranslationCounter: Subject<any> = new Subject();
  public sidebarStates: boolean[] = [true, false, false];

  constructor() { }

  public setSidebarStatus(index: number) {
    this.sidebarStates = this.sidebarStates.map(_ => false);
    this.sidebarStates[index] = true;
  }

  public initSidebar(index: number): void {
    setTimeout(() => { this.setSidebarStatus(index) }, 5)
  }
}
