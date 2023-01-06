import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';


const routes: Routes = [
  {path:'', component: HeroesComponent,canActivate:[AuthGuard]},
  {path:':id', component: HeroDetailComponent,canActivate:[AuthGuard]}
]

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
