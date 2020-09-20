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
  public hideChildKeys: boolean = true;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {}

  public editKeys(): void {
    console.log(this.key)
    this.storageService.editKeySubject.next(this.key);
  }

}
