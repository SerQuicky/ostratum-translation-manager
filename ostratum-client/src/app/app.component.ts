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
    if (JSON.parse(localStorage.getItem("darkmode"))) {
      document.getElementById("body").classList.add("dark-mode");
    }

    const language: string = localStorage.getItem("language") ? JSON.parse(localStorage.getItem("language")) : "en";
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }

  ngAfterViewInit(): void {
    this.modalService.setContainerRef(this.vc);
    //let component: ComponentRef<DialogModalComponent> = this.modalService.createComponent<DialogModalComponent>(this.componentResolver.resolveComponentFactory(DialogModalComponent));
    //let component: ComponentRef<DialogModalComponent> = this.modalService.createDialogModal("Hey", "Du loser das ist ein Text", "Delete", "Close", "btn btn-danger");
    //component.instance.execute.subscribe(test => console.log(test));
  }

}
