import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HeadersService } from './headers.service';
import { UserMaster } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<UserMaster | null>;
  public user: Observable<UserMaster | null>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private header: HeadersService

  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  loginUser(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // 'rejectUnauthorized': 'false'

      // Add any other required headers
    });

    const options = { headers: headers, rejectUnauthorized: false };
    return this.http.post<any>(`${environment.apiUrl}/authenticate`, data, options)
      .pipe(map(user => {
        this.userSubject.next(user);
        return user;
      }));
  }

  forgotpassword(formData: FormData) {
    let headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // Add any other required headers
    });
    const httpOptions = { headers: headers };
    return this.http.post<any>(`${environment.apiUrl}/forgot-password`, formData, httpOptions)
  }

  newPassword(body: any): Observable<any> {
    let data:any = {
      password:body.password
    }
    return this.http.put(`${environment.apiUrl}/reset-password?token=${body.token}`,data);
  }

  gettoken() {
    return !!localStorage.getItem("Token");
  }
  loginDetail(data: any) {
    return new Promise((resolve, reject) => {
      let headers = this.header.getJWTHeaders();
      const httpOptions = { headers: headers };
      this.http.get(`${environment.apiUrl}/userinfo/${data}`, httpOptions).subscribe(result => {
        resolve(result);
      }, (err) => {
        reject(err);
      });
    });
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('cartItems');
    this.router.navigate(['/login']);
    localStorage.clear();
    this.userSubject.next(null);
    window.location.reload();

  }
  // login(username: string, password: string) {
  //   return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
  //     .pipe(map(user => {
  //       localStorage.setItem('user', JSON.stringify(user));
  //       this.userSubject.next(user);
  //       // this.startRefreshTokenTimer();
  //       return user;
  //     }));
  // }
  // refreshToken() {
  //   return this.http.post<any>(`${environment.apiUrl}/users/refresh-token`, {}, { withCredentials: true })
  //     .pipe(map((user) => {
  //       this.userSubject.next(user);
  //       // this.startRefreshTokenTimer();
  //       return user;
  //     }));
  // }

  // private refreshTokenTimeout?: any;

  // private startRefreshTokenTimer() {
  //   const jwtBase64 = this.userValue!.token!.split('.')[1];
  //   const jwtToken = JSON.parse(atob(jwtBase64));
  //   const expires = new Date(jwtToken.exp * 1000);
  //   const timeout = expires.getTime() - Date.now() - (60 * 1000);
  //   this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  // }

  // private stopRefreshTokenTimer() {
  //   clearTimeout(this.refreshTokenTimeout);
  // }
}
