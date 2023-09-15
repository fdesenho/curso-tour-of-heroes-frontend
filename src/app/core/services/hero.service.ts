import { Injectable } from '@angular/core';
import { finalize, Observable, of, tap } from 'rxjs';
import { Hero } from '../models/hero.model';
import { MessageService } from './message.service';
import { HEROES } from '../../mock.heroes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl =  `${environment.baseUrl}/heroes`;
  private actualPage = 1;
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private loadingService: LoadingService){

  }
  getByLimit(limit:string): Observable<Hero[]>{
    console.log(this.actualPage++);
    let params = new HttpParams()
      .set("_page",this.actualPage++)
      .set("_limit",limit)

    return this.http
    .get<Hero[]>(this.heroesUrl)
    .pipe(tap((heroes)=> this.log(`fetched ${heroes.length} hero(es)` )));

  }
  getAll(): Observable<Hero[]>{

    return this.http
    .get<Hero[]>(this.heroesUrl)
    .pipe(tap((heroes)=> this.log(`fetched ${heroes.length} hero(es)` )));

  }
  getOne(id: number): Observable<Hero> {
    return this.http
    .get<Hero>(`${this.heroesUrl}/${id}`)
    .pipe(tap((heroes)=> this.log(`fetched id= ${heroes.id} and name ${heroes.name}` )))
   ;

  }
  private log(message: string): void {
    this.messageService.add(`Hero service:  ${message}`);
  }
  create(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(this.heroesUrl, hero)
      .pipe(tap((hero) => this.log(`create ${this.descAttributes(hero)}`)));
  }
  createAll(hero: Hero[]): Observable<Hero> {
    return this.http
      .post<Hero>(this.heroesUrl, hero)
      .pipe(tap((hero) => this.log(`create ${this.descAttributes(hero)}`)));
  }
  update(hero: Hero): Observable<Hero> {
    return this.http
      .put<Hero>(this.getUrl(hero.id), hero)
      .pipe(tap((hero) => this.log(`updated ${this.descAttributes(hero)}`)));
  }
  delete(hero: Hero): Observable<any> {
    return this.http.delete<any>(this.getUrl(hero.id))
    .pipe(tap(() => this.log(`delete ${this.descAttributes(hero)}`)));;
  }
  private getUrl(id: number): string {
    return `${this.heroesUrl}/${id}`;
  }
  private descAttributes(hero: Hero): string {
    return `Hero ID=${hero.id} and Name=${hero.name}`;
  }


  search(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http
      .get<Hero[]>(`${this.heroesUrl}?name=${term}`)
      .pipe(
        tap((heroes) =>
          heroes.length
            ? this.log(`found ${heroes.length} hero(es) matching "${term}"`)
            : this.log(`no heroes matching "${term}"`)
        )
      );
  }
}
