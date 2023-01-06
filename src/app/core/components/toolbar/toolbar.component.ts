import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu-Item.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent  {
  @Input() isLoggedIn : boolean | null = null;
  @Input() title = '';
  @Input() menuItems : MenuItem[] = [] ;

  @Output() private logout= new EventEmitter();
  constructor(private router: Router){

  }
  routerLink(route:string): void{
    this.router.navigate([route]);
  }
  onLogout(): void {
    this.logout.emit();
  }

}
