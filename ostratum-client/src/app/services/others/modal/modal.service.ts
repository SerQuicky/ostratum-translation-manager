import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { DialogModalComponent } from 'src/app/components/modals/dialog-modal/dialog-modal.component';
import { EditModalComponent } from 'src/app/components/modals/edit-modal/edit-modal.component';
import { LanguageModalComponent } from 'src/app/components/modals/language-modal/language-modal.component';
import { UserModalComponent } from 'src/app/components/modals/user-modal/user-modal.component';
import { Language } from 'src/app/interfaces/language.interface';
import { Project } from 'src/app/interfaces/project.interface';
import { TranslationProject } from 'src/app/interfaces/translation.project.interface';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {


  //TODO: Combine all create Functions

  private viewContainerRef: ViewContainerRef

  constructor(private componentResolver: ComponentFactoryResolver) { }

  public setContainerRef(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  public createComponent<T>(component: ComponentFactory<T>): ComponentRef<T> {
    // TODO: check if normal return is enough
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

  public createProjectEditModal(title: string, project: Project | TranslationProject, acceptText: string, dismissText: string, acceptClass: string, projectId?: number): ComponentRef<EditModalComponent> {
    const factory: ComponentFactory<EditModalComponent> = this.componentResolver.resolveComponentFactory(EditModalComponent);
    const component: ComponentRef<EditModalComponent> = this.viewContainerRef.createComponent(factory);
    component.instance.title = title;
    component.instance.project = project;
    component.instance.acceptText = acceptText;
    component.instance.dismissText = dismissText;
    component.instance.acceptClass = acceptClass;
    component.instance.projectId = projectId

    return component;
  }

  public createUserModal(user: User, title: string, acceptText: string, dismissText: string, acceptClass: string): ComponentRef<UserModalComponent> {
    const factory: ComponentFactory<UserModalComponent> = this.componentResolver.resolveComponentFactory(UserModalComponent);
    const component: ComponentRef<UserModalComponent> = this.viewContainerRef.createComponent(factory);
    component.instance.title = title;
    component.instance.user = user;
    component.instance.acceptText = acceptText;
    component.instance.dismissText = dismissText;
    component.instance.acceptClass = acceptClass;

    return component;
  }

  public createLanguageModal(language: Language, title: string, acceptText: string, dismissText: string, acceptClass: string): ComponentRef<LanguageModalComponent> {
    const factory: ComponentFactory<LanguageModalComponent> = this.componentResolver.resolveComponentFactory(LanguageModalComponent);
    const component: ComponentRef<LanguageModalComponent> = this.viewContainerRef.createComponent(factory);
    component.instance.title = title;
    component.instance.language = language;
    component.instance.acceptText = acceptText;
    component.instance.dismissText = dismissText;
    component.instance.acceptClass = acceptClass;

    return component;
  }
}
