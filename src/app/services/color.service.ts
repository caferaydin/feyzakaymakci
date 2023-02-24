import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/entities/color';
import { ListResponseModel } from '../models/responseModel/listResponseModel';
import { ResponseModel } from '../models/responseModel/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44322/api/Colors/";
  
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  addColor(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,color)
  }
}