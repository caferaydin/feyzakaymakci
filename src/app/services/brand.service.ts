import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/responseModel/listResponseModel';
import { Observable } from 'rxjs';
import { Brand } from '../models/entities/brand';
import { ResponseModel } from '../models/responseModel/responseModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44322/api/Brands/';
  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  addBrand(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
}
