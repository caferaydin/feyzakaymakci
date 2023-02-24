import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/entities/car';
import { CarDetailsDto } from '../models/dtos/carDetailsDto';
import { ListResponseModel } from '../models/responseModel/listResponseModel';
import { ResponseModel } from '../models/responseModel/responseModel';
import { SingleResponseModel } from '../models/responseModel/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44322/api/Cars/";
  constructor(private httpClient:HttpClient) { }
  
  carAdd(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,car)
  }

  getCars():Observable<ListResponseModel<CarDetailsDto>>{ 
    let newPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(newPath);
  }

  getByCarId(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath=this.apiUrl+"getbycarid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath)
  }

  getCarByBrand(brandId:number):Observable<ListResponseModel<CarDetailsDto>>{
    let newPath = this.apiUrl + "getbybrandid?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(newPath);
  }

  getCarByColor(colorId:number):Observable<ListResponseModel<CarDetailsDto>>{
    let newPath = this.apiUrl + "getbycolorid?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(newPath);
  }

  
  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<CarDetailsDto>>{
    let newPath=this.apiUrl+"getdetailsdtobycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(newPath);
  }
  

  getCarDetailsByColorAndBrand(brandId:number, colorId:number):Observable<ListResponseModel<CarDetailsDto>>{
    let newPath=this.apiUrl + "getdetailsdtobybrandidandcolorid?brandId="+brandId+ "&colorId=" +colorId;
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(newPath);
  }
}

