import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HeroesComponent } from './heroes/components/heroes/heroes.component';
import { HeroesModule } from './heroes/heroes.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { LegalAgeDirective } from './directives/legal-age.directive';


@NgModule({
  declarations: [
    AppComponent,
    LegalAgeDirective,


  ],
  imports: [
    //angular
    BrowserModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,


    //app
    AppRoutingModule,
    CoreModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
