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

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProjectsPageComponent,
    TranslationProjectsPageComponent,
    TranslationsPageComponent,
    SidebarComponent,
    ProjectComponent,
    TranslationProjectComponent
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
