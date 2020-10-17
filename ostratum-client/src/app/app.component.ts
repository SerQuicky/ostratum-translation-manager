import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogModalComponent } from './components/modals/dialog-modal/dialog-modal.component';
import { TranslationService } from './services/communication/translation/translation.service';
import { ModalService } from './services/others/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild("vc", { read: ViewContainerRef }) vc: ViewContainerRef;
  title = 'ostratum-client';

  constructor(private modalService: ModalService, private translate: TranslateService) {
    // set layout design (light-/dark-mode)
    if (JSON.parse(localStorage.getItem("darkmode"))) {
      document.getElementById("body").classList.add("dark-mode");
    }

    // set language that the application uses
    if (localStorage.getItem("lang")) {
      const language: string = localStorage.getItem("lang");
      this.translate.setDefaultLang(language);
    } else {
      localStorage.setItem("lang", "en");
    }
    
    this.translate.use(localStorage.getItem("lang"));
  }

  ngAfterViewInit(): void {
    this.modalService.setContainerRef(this.vc);
  }

}
