import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  unsubscribe() {
    throw new Error('Method not implemented.');
  }
  constructor(private httpService: HttpService) { }

  getAll(_data: any): Observable<any> {
    return this.httpService.get(_data).pipe(map(data => data as any));
  }

  getA(_data: any): Observable<any> {
    return this.httpService.get(_data).pipe(map(data => data as any));
  }
  
  deleteID(_data: any): Observable<any> {
    return this.httpService.deleteID(_data).pipe(map(data => data as any));
  }

  update(_data:any): Observable<any> {
    return this.httpService.Update(_data).pipe(map(data => data as any));
  }

  add(_data:any): Observable<any> {
    return this.httpService.Add(_data).pipe(map(data => data as any));
  }



}
