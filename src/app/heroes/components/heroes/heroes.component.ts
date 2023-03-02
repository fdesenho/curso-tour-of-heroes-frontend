import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { DialogData } from '../../../core/models/dialog-data.model';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatCell, MatRow, MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {



  displayedColumns: string[] = ['id', 'name','genre', 'actions'];
  heroes: Hero[] =[]
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  dataSource : any;


  constructor(private dialog: MatDialog, private heroService: HeroService) {}

  ngOnInit(): void {

    this.getHeroes();


  }

  getHeroes(): void {

    this.heroService.getAll().subscribe(
      (heroes) => {
      this.dataSource = heroes;
      this.heroes = heroes;
      this.dataSource =new MatTableDataSource(heroes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;

     });
  }

  delete(hero: Hero): void {
    const dialogData: DialogData = {
      cancelText: 'Cancel',
      confirmText: 'Delete',
      content: `Delete '${hero.name}'?`,
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.heroService.delete(hero).subscribe(() => this.getHeroes());
      }
    });
  }

  onSelected(hero: Hero): void {
    this.delete(hero);
  }


}
