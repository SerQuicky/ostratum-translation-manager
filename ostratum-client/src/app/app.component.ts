import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogModalComponent } from './components/modals/dialog-modal/dialog-modal.component';
import { ModalService } from './services/others/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  @ViewChild("vc", {read: ViewContainerRef}) vc: ViewContainerRef;
  title = 'ostratum-client';

  constructor(private modalService: ModalService, private componentResolver: ComponentFactoryResolver) {
    if(JSON.parse(localStorage.getItem("darkmode"))) {
      document.getElementById("body").classList.add("dark-mode");
    }
  }

  ngAfterViewInit(): void {
    this.modalService.setContainerRef(this.vc);
    //let component: ComponentRef<DialogModalComponent> = this.modalService.createComponent<DialogModalComponent>(this.componentResolver.resolveComponentFactory(DialogModalComponent));
    //let component: ComponentRef<DialogModalComponent> = this.modalService.createDialogModal("Hey", "Du loser das ist ein Text", "Delete", "Close", "btn btn-danger");
    //component.instance.execute.subscribe(test => console.log(test));
  }

}
