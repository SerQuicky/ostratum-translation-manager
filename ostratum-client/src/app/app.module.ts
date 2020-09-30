import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { TranslationProjectsPageComponent } from './pages/translation-projects-page/translation-projects-page.component';
import { TranslationsPageComponent } from './pages/translations-page/translations-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './services/communication/authentication/authentication.service';
import { CommonCommunication } from './services/communication/common.communication';
import { ProjectComponent } from './components/project/project.component';
import { TranslationProjectComponent } from './components/translation-project/translation-project.component';
import { KeyComponent } from './components/key/key/key.component';
import { TranslationPipePipe } from './pipes/translation-pipe/translation-pipe.pipe';
import { AccountPageComponent } from './pages/account-page/account-page/account-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page/settings-page.component';
import { DialogModalComponent } from './components/modals/dialog-modal/dialog-modal.component';
import { EditModalComponent } from './components/modals/edit-modal/edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProjectsPageComponent,
    TranslationProjectsPageComponent,
    TranslationsPageComponent,
    SidebarComponent,
    ProjectComponent,
    TranslationProjectComponent,
    KeyComponent,
    TranslationPipePipe,
    AccountPageComponent,
    SettingsPageComponent,
    DialogModalComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CommonCommunication],
  bootstrap: [AppComponent]
})
export class AppModule { }
