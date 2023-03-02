import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { LoadingService } from './loading.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl =  `${environment.baseUrl}/users`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private loadingService: LoadingService){

  }

  create(user: User): Observable<User> {
    return this.http
      .post<User>(this.usersUrl, user)
      .pipe(tap((user) => console.log(`create ${this.descAttributes(user)}`)));
  }

  private descAttributes(user: User): string {
    return `User Name=${user.name}`;
  }
  getAll(email: string): Observable<User[]> {

    return this.http
    .get<User[]>(`${this.usersUrl}`);

  }
  getByEmail(email: string): Observable<User[]> {

    const users = this.http.get<User[]>(`${this.usersUrl}`)
    .pipe(map((response:User[])=>response.filter(user=>user.email===email)));

    return  users;

  }
}
