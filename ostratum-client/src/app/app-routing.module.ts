import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { TranslationProjectsPageComponent } from './pages/translation-projects-page/translation-projects-page.component';
import { TranslationsPageComponent } from './pages/translations-page/translations-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'main',
    component: SidebarComponent,
    children: [
      {
        path: 'projects',
        component: ProjectsPageComponent,
      },
      {
        path: 'tprojects/:projectId',
        component: TranslationProjectsPageComponent
      },
      {
        path: 'translations/:tprojectId',
        component: TranslationsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
