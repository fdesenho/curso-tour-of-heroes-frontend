import { Injectable } from '@angular/core';
import { finalize, Observable, of, tap } from 'rxjs';
import { Hero } from '../models/hero.model';
import { MessageService } from './message.service';
import { HEROES } from '../../mock.heroes';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl =  `${environment.baseUrl}/heroes`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private loadingService: LoadingService){

  }

  getHeroes(): Observable<Hero[]>{

    return this.http
    .get<Hero[]>(this.heroesUrl)
    .pipe(tap((heroes)=> this.log(`fetched ${heroes.length} hero(es)` )));

  }
  getHero(id: number): Observable<Hero> {
    return this.http
    .get<Hero>(`${this.heroesUrl}/${id}`)
    .pipe(tap((heroes)=> this.log(`fetched id= ${heroes.id} and name ${heroes.name}` )))
   ;

  }
  private log(message: string): void {
    this.messageService.add(`Hero service:  ${message}`);
  }
  update(hero: Hero): Observable<Hero> {
    return this.http
      .put<Hero>(this.getUrl(hero.id), hero)
      .pipe(tap((hero) => this.log(`updated ${this.descAttributes(hero)}`)));
  }
  private getUrl(id: number): string {
    return `${this.heroesUrl}/${id}`;
  }
  private descAttributes(hero: Hero): string {
    return `Hero ID=${hero.id} and Name=${hero.name}`;
  }
}
