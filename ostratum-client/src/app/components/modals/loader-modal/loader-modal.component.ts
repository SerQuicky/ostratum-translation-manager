import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-loader-modal',
  templateUrl: './loader-modal.component.html',
  styleUrls: ['./loader-modal.component.scss']
})
export class LoaderModalComponent implements OnInit {

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
