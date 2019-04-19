import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';

import { HomeComponent } 		from '../home/home.component';
import { ProgrammeComponent }		from '../programme/programme.component';
import { AjoutProgrammeComponent }	from '../ajout-programme/ajout-programme.component';
import { ModifierProgrammeComponent }	from '../modifier-programme/modifier-programme.component';
import { ClasseComponent }		from '../classe/classe.component';
import { CoursComponent }		from '../cours/cours.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  }, {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  //Entité cours
  { 
	path: 'cours', 
	component: CoursComponent
  },
  {
	path: 'cours/:id', 
	component: CoursComponent
  },
  //Entité programme
  { 
	path: 'programme', 
	component: ProgrammeComponent
  },
  { 
	path: 'ajout-programme', 
	component: AjoutProgrammeComponent
  },
  {
    path: 'modifier-programme/:id',
    component: ModifierProgrammeComponent
  },
  { 
	path: 'classe', 
	component: ClasseComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
