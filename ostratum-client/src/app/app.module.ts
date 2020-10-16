import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { TranslationProjectsPageComponent } from './pages/translation-projects-page/translation-projects-page.component';
import { TranslationsPageComponent } from './pages/translations-page/translations-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { UsersPageComponent } from './pages/users-page/users-page/users-page.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguagePageComponent } from './pages/language-page/language-page/language-page.component';
import { UserModalComponent } from './components/modals/user-modal/user-modal.component';
import { LanguageModalComponent } from './components/modals/language-modal/language-modal.component';
import { LoaderModalComponent } from './components/modals/loader-modal/loader-modal.component';
import { TranslationModalComponent } from './components/modals/translation-modal/translation-modal.component';
import { SelectModalComponent } from './components/modals/select-modal/select-modal.component';

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
    EditModalComponent,
    UsersPageComponent,
    LanguagePageComponent,
    UserModalComponent,
    LanguageModalComponent,
    LoaderModalComponent,
    TranslationModalComponent,
    SelectModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }

    })
  ],
  providers: [CommonCommunication],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
