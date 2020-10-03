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
  public updateProjectsSubject: Subject<any> = new Subject();


  public sidebarStates: boolean[] = [true, false, false, false, false];
  public logoURL: string = "../../../assets/images/ostratum_logo_2.png";

  public adminState: boolean = false;

  constructor() {
    this.adminState = JSON.parse(localStorage.getItem("state"));
   }

  public setSidebarStatus(index: number) {
    this.sidebarStates = this.sidebarStates.map(_ => false);
    this.sidebarStates[index] = true;
  }

  public initSidebar(index: number): void {
    setTimeout(() => { this.setSidebarStatus(index) }, 5)
  }

  public setDesignState(): void {
    if(JSON.parse(localStorage.getItem("darkmode"))) {
      document.getElementById("body").classList.add("dark-mode");
      this.logoURL = "../../../assets/images/ostratum_logo_dark.png"
    } else {
      document.getElementById("body").classList.remove("dark-mode");
      this.logoURL = "../../../assets/images/ostratum_logo_2.png";
    }
  }
}
