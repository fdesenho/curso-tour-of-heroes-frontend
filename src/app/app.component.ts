import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { MenuItem } from './core/models/menu-Item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn$ : Observable<boolean>;
  title = 'Tour of heroes';
  menuItems : MenuItem[]=
  [
    {
      icon : 'dashboard',
      routerLink : '/dashboard',
      toolTipText : 'Dashboard'
    },
    {
      icon : 'sports-martial_arts',
      routerLink : '/heroes',
      toolTipText : 'Heroes'
    }
  ];
  constructor(private authService : AuthService){
    this.isLoggedIn$=this.authService.isLoggedIn$;
  }

  onLogout():void{
    this.authService.logout();
  }
}
