import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu-Item.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent  {
  @Input() title = '';
  @Input() menuItems : MenuItem[] = [] ;

  constructor(private router: Router){

  }
  routerLink(route:string): void{
    this.router.navigate([route]);
  }

}
