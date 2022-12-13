import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardModule } from '../dashboard/dashboard.module';
import { HeroesRoutingModule } from './heroes-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [HeroDetailComponent,HeroesComponent],
  imports: [
    CommonModule,MaterialModule,FormsModule,HeroesRoutingModule,FlexLayoutModule
  ]
})
export class HeroesModule { }
