import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HeadersService } from 'src/app/_services/headers.service';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {


  constructor(private http: HttpClient,
    private header: HeadersService) { }

    customerDetailByID(data: any) {
    let headers = this.header.getJWTHeaders();
    const httpOptions = { headers: headers };
    return this.http.get<any>(`${environment.apiUrl}/customer/${data}`, httpOptions);
  }
}
