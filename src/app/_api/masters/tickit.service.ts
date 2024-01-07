import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import { ticketMasterModel } from 'src/app/_models/ticket';
import { HeadersService } from 'src/app/_services/headers.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TickitService {

  constructor(private http: HttpClient,
    private header: HeadersService) { }
  saveMasterData(formData: FormData) {
    let headers = this.header.getJWTHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const httpOptions = { headers: headers };
    return this.http.post<ticketMasterModel>(`${environment.apiUrl}/ticket`, formData, httpOptions)
  }

  updateMasterData(formData: FormData, id: any) {
    let headers = this.header.getJWTHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json')
    const httpOptions = { headers: headers };
    return this.http.put<ticketMasterModel>(`${environment.apiUrl}/ticket/${id}`, formData, httpOptions)
  }

  updateMasterData1(formData: FormData){
    let headers = this.header.getJWTHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json')
    const httpOptions = { headers: headers };
    return this.http.put<ticketMasterModel>(`${environment.apiUrl}/ticket/ticketapproval`, formData, httpOptions)
  }

  procatupdateMasterData(formData: FormData, id: any) {
    let headers = this.header.getJWTHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json')
    const httpOptions = { headers: headers };
    return this.http.put<ticketMasterModel>(`${environment.apiUrl}/productCategory/${id}`, formData, httpOptions)
  }


  saveProdactCategoryMasterData(formData: FormData) {
    let headers = this.header.getJWTHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const httpOptions = { headers: headers };
    return this.http.post<ticketMasterModel>(`${environment.apiUrl}/productCategory`, formData, httpOptions)
  }

  saveProdactMasterData(formData: FormData) {
    let headers = this.header.getJWTHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const httpOptions = { headers: headers };
    return this.http.post<ticketMasterModel>(`${environment.apiUrl}/product`, formData, httpOptions)
  }

  procatupdatData(formData: FormData, id: any) {
    let headers = this.header.getJWTHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json')
    const httpOptions = { headers: headers };
    return this.http.put<ticketMasterModel>(`${environment.apiUrl}/product/${id}`, formData, httpOptions)
  }

  downloadInvoice(invoiceId: any) {
    // const url = `your/invoice/api/endpoint/${invoiceId}`;
    const invoiceUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    let headers = this.header.getJWTHeaders();
    this.http.get(invoiceUrl, { headers, responseType: 'blob' }).subscribe((response: any) => {
      saveAs(response, 'invoice.pdf');
    });
  }


}
