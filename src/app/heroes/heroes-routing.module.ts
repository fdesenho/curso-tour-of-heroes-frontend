import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';


const routes: Routes = [
  {path:'', component: HeroesComponent},
  {path:':id', component: HeroDetailComponent}
]

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
