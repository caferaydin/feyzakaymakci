
/* import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-photo',
  template: `<img [src]="imageUrl" alt="Fotoğraf">`
})
export class PhotoComponent {
  imageUrl = 'https://localhost:44306/Uploads/Images/'

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://localhost:44306/Uploads/Images/').subscribe((data: any) => {
      this.imageUrl = data.url;
    });
  }
}
*/



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/entities/carImage';
import { CarImageService } from 'src/app/services/car-image.service';


@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {

  carImages:CarImage[]=[];

  imageUrl="https://localhost:44306/Uploads/Images/"

  constructor(private carImageService:CarImageService,private activedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
     /* Biz burada şunu yaptık: araçlar için ayrıntılı 
    bir sayfa olacak ya her aracın kendine ait bir kimliği olacak.
    Araç kimliğini yakalamak için activatedroute servisinin params 
    özelliği ile elde ediyoruz.*/

    this.activedRoute.params.subscribe(params=>{
      if (params["carId"]) {
        this.getCarImagesByCarId(params["carId"])
      }
    })
  }
  
  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
      this.carImages=response.data;
      
    })
  }

  getActiveImageClass(carImage:CarImage){
    if (carImage===this.carImages[0]) {
      return "active"
    } else {
      return ""
    }
  }

}
