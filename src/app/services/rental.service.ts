import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDetailDto } from '../models/dtos/rentalDetailsDto';
import { ListResponseModel } from '../models/responseModel/listResponseModel';
import { ResponseModel } from '../models/responseModel/responseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44322/api/Rentals/";
  constructor(private httpClient:HttpClient) { }
  
  getRentalDetails():Observable<ListResponseModel<RentalDetailDto>>{
    let newPath=this.apiUrl+"getrentalsdetails"
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }
  
    isCarAvaible(carId: number) {
      let newPath = this.apiUrl + "iscaravaible?cardId=" + carId;
      return this.httpClient.get<ResponseModel>(newPath);
}
}
