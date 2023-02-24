import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Rental } from '../models/entities/rental';
import { ResponseModel } from '../models/responseModel/responseModel';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl="https://localhost:44322/api/Rentals/"
  
  private dataSource=new ReplaySubject<Rental>(1)//rental türünde kayıt tutuyor. 
 
  currentData=this.dataSource.asObservable();

  constructor(private httpClient:HttpClient) { }
  
  updateData(data:Rental){ 
    this.dataSource.next(data);
  }

  add(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }

  totalPrice(totalAmountInfo:any):Observable<any>{
    let newPath=this.apiUrl+"totalprice"
    return this.httpClient.get<any>(newPath,totalAmountInfo)
  }
}
