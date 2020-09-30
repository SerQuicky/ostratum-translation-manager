import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { DialogModalComponent } from 'src/app/components/modals/dialog-modal/dialog-modal.component';
import { EditModalComponent } from 'src/app/components/modals/edit-modal/edit-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private viewContainerRef: ViewContainerRef

  constructor(private componentResolver: ComponentFactoryResolver) { }

  public setContainerRef(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  public createComponent<T>(component: ComponentFactory<T>): ComponentRef<T> {
    const cf: ComponentRef<T> = this.viewContainerRef.createComponent(component);
    return cf;
  }

  public createDialogModal(title: string, description: string, acceptText: string, dismissText: string, acceptClass: string): ComponentRef<DialogModalComponent> {
    const factory: ComponentFactory<DialogModalComponent> = this.componentResolver.resolveComponentFactory(DialogModalComponent);
    const component: ComponentRef<DialogModalComponent> = this.viewContainerRef.createComponent(factory);
    component.instance.title = title;
    component.instance.description = description;
    component.instance.acceptText = acceptText;
    component.instance.dismissText = dismissText;
    component.instance.acceptClass = acceptClass;

    return component;
  }

  public createEditModal(title: string, titleVale: string, descriptionValue: string, acceptText: string, dismissText: string, acceptClass: string): ComponentRef<EditModalComponent> {
    const factory: ComponentFactory<EditModalComponent> = this.componentResolver.resolveComponentFactory(EditModalComponent);
    const component: ComponentRef<EditModalComponent> = this.viewContainerRef.createComponent(factory);
    component.instance.title = title;
    component.instance.titleValue = titleVale;
    component.instance.descriptionValue = descriptionValue;
    component.instance.acceptText = acceptText;
    component.instance.dismissText = dismissText;
    component.instance.acceptClass = acceptClass;

    return component;
  }
}
