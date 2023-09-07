import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private userActive: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    this.userActive = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userActive.asObservable();
  }

  public get currentUser(): User | null {
    return this.userActive.value;
  }

  login(email: string, password: string) {
    return this.http.get<User>('../../assets/static/users.json').pipe(map((data: any) => {
            for(const dt in data){
              if(data[dt].email === email && data[dt].password === password){
                localStorage.setItem('user', JSON.stringify(data[dt]));
                this.userActive.next(data[dt]);
                return data[dt];
              }
            }
        }));
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.clear();
      this.userActive.next(null);
      this.router.navigate(['/login']);
  }

}
