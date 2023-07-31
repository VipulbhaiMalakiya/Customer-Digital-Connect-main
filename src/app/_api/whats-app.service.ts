import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HeadersService } from '../_services/headers.service';
import {  WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {

  private socket$!: WebSocketSubject<any>;
  private baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient,
    private header: HeadersService) {
  }

  chatHistory(request: any) {
    let headers = this.header.getJWTHeaders();
    const httpOptions = { headers: headers };
    return this.http.get(this.baseUrl + `/chatlist/history/number/${request}`, httpOptions);
  }

  getContactList(){
    let headers = this.header.getJWTHeaders();
    const httpOptions = { headers: headers };
    return this.http.get(this.baseUrl + `/chatlist/latest-messages`, httpOptions);

    // return this.http.get(this.baseUrl + `/message-history/latest-messages`, httpOptions);
  }

  getContactListForUser(data:any){
    let headers = this.header.getJWTHeaders();
    const httpOptions = { headers: headers };
    return this.http.get(this.baseUrl + `/message-history/latest-messages/assignedto/${data}`, httpOptions);
  }

  close() {
    this.socket$.complete();
  }
  sendWhatsAppMessage(formData: FormData) {
    let headers = this.header.getJWTHeaders();
    const httpOptions = { headers: headers };
    return this.http.post(this.baseUrl + '/outgoing/send-message', formData, httpOptions);
    // return this.http.post(this.baseUrl + '/outgoing-message', request, httpOptions);
  }

  sendnotesMessage(request:any) {
    let headers = this.header.getJWTHeaders();
    const httpOptions = { headers: headers };
    return this.http.post(this.baseUrl + '/outgoing-message', request, httpOptions);
  }
}
