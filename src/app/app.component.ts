import { Component } from '@angular/core';
import { MenuItem } from './core/models/menu-Item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
}
