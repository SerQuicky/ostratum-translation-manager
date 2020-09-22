import { Component, Input, OnInit } from '@angular/core';
import { Key } from 'src/app/interfaces/key.interface';
import { StorageService } from 'src/app/services/others/storage/storage.service';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {

  @Input("key") key: Key;
  public hideChildKeys: boolean = false;
  public openTranslationCounter: number = 0;
  public objectHolder: boolean = false;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.objectHolder = this.key.values[0].value == null;
    this.openTranslationCounter = this.key.values.filter(value => value.value == "").length;
  }

  public editKeys(): void {
    if(this.objectHolder) {
      this.hideChildKeys = !this.hideChildKeys;
    } else {
      this.storageService.editKeySubject.next(this.key);
    }
  }


}
