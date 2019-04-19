
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ClasseComponent } from './classe/classe.component';
import { ProfesseurComponent } from './professeur/professeur.component';
import { ProgrammeComponent } from './programme/programme.component';
import { TrimestreComponent } from './trimestre/trimestre.component';
import { AjoutProgrammeComponent } from './ajout-programme/ajout-programme.component';
import { ModifierProgrammeComponent } from './modifier-programme/modifier-programme.component';
import { CoursComponent } from './cours/cours.component';

import { WINDOW_PROVIDERS } from "./window.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ClasseComponent,
    ProfesseurComponent,
    ProgrammeComponent,
    TrimestreComponent,
    AjoutProgrammeComponent,
    ModifierProgrammeComponent,
    CoursComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
	ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: CatchErrorInterceptor,
    multi: true,
  }, 
	WINDOW_PROVIDERS ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
