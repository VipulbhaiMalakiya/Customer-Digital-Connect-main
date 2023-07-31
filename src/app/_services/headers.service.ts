import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor(private http: HttpClient) {

   }



  getJWTHeaders(){
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('Token')}`,
      // 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.apiUrl,
    })
    return headers;
  }
}



