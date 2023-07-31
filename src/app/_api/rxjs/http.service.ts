import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/_services';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient,
    private auth: AuthenticationService,
    private toastr: ToastrService) { }

  get(url: string, params?: any): Observable<any> {
    const data = { params, headers: this.getAuthHeader() };
    return this.http.get(this.baseUrl + url, data)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  deleteID(url: string): Observable<any> {
    const data = { headers: this.getAuthHeader() };
    return this.http.delete(this.baseUrl + url, data)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  Update(url: any): Observable<any> {
    const data = { headers: this.getAuthHeader() };
    return this.http.put(this.baseUrl + url.url, url?.model, data)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  Add(url: any): Observable<any> {
    const data = { headers: this.getAuthHeader() };
    return this.http.post(this.baseUrl + url.url, url?.model, data)
      .pipe(catchError(this.errorHandler.bind(this)));
  }


  public errorHandler(responce: any) {
    const error = responce.error;
    const keys = Object.keys(error);
    const key = keys[0];
    let message = error[key];

    if (responce.status === 401) {
      this.auth.logout();
    }
    if (error[key] instanceof Array) {
      message = error[key][0];
    }
    if (key === 'isTrusted') {
      this.toastr.error("Server Not Responding !");
    }
    else {
      message = key + ' : ' + message;
    }
    return throwError({ messages: message, error: error })
  }

  private getAuthHeader(): { [Header: string]: string | string[]; } {
    return {
      'Authorization': `Bearer ${localStorage.getItem('Token')}`,
      'Access-Control-Allow-Origin': this.baseUrl,
      // 'Content-Type':'application/json'
    }
  }
}
