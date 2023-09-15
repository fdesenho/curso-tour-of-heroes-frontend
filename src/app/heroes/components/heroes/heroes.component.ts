import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { DialogData } from '../../../core/models/dialog-data.model';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatCell, MatRow, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'genre', 'actions'];
  heroes: Hero[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  dataSource: any;
  itemFile_i!: any;

  constructor(private dialog: MatDialog,
            private heroService: HeroService,
            private router: Router) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroesByLimit(limit:string): void {

    this.heroService.getByLimit(limit).subscribe((heroes) => {
      this.dataSource = heroes;
      this.heroes = heroes;
      this.dataSource = new MatTableDataSource(heroes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });
  }
  getHeroes():void{
    this.heroService.getAll().subscribe((heroes) => {
      this.dataSource = heroes;
      this.heroes = heroes;
      this.dataSource = new MatTableDataSource(heroes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });
  }

  delete(hero: Hero): void {
    const dialogData: DialogData = {
      title:'',
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

  uploadHeroes(inputFile: any): void {

    const file = inputFile.target.files[0];
    let reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
     let csv: any = reader.result;
     let allTextLines = [];
     allTextLines = csv.split(/\r|\n|\r/);

    const arrayheros :Hero[]=[] ;
    for(let i = 1; i < allTextLines.length;i++){
      const cvsHeroes = allTextLines[i].split(';');
      if(cvsHeroes.length>2){
        const hero: Hero = {

          name: cvsHeroes[1],
          genre: cvsHeroes[2],
        }as Hero;
        arrayheros.push(hero);
        //TODO change to suport more registers

        this.heroService.create(hero).pipe(tap(()=>{this.ngOnInit()})).subscribe(()=>{
          this.showResumeUpload(hero);

        })
        break;
      }
    }


    //validateFile in backend
    //if ok continous
    //Do upload of archive csv
    //save file
    //transformer file in list of heroes
  }
}

  showResumeUpload(hero: Hero) : void {
    const dialogData: DialogData = {
      title:'Upload has fineshed',
      cancelText: '',
      confirmText: '',
      content: `Name: ${hero.name}`,
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
      width: '300px',
    });


  }
}

