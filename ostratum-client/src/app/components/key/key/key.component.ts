import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Key } from 'src/app/interfaces/key.interface';
import { StorageService } from 'src/app/services/others/storage/storage.service';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit, OnDestroy {

  @Input("key") key: Key;
  @Input("searchbarValue") searchbarValue: string;
  @Input("showMissingTranslations") showMissingTranslations: boolean;
  @Input("chosenKeyId") chosenKeyId: string;

  public hideChildKeys: boolean = true;
  public openTranslationCounter: number = 0;
  public objectHolder: boolean = false;
  private updateSubscription: Subscription;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.objectHolder = this.key.values[0].value == null;
    this.countOpenTranslations();

    this.updateSubscription = this.storageService.updateTranslationCounter.subscribe(_ => this.countOpenTranslations());
  }

  private countOpenTranslations(): void {
    this.openTranslationCounter = this.key.values.filter(value => value.value == "").length;
  }

  public editKeys(): void {
    if(this.objectHolder) {
      this.hideChildKeys = !this.hideChildKeys;
    } else {
      this.storageService.editKeySubject.next(this.key);
    }
  }

  public ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

}
