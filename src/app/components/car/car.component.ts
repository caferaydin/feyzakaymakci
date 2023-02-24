import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/entities/brand';
import { Car } from 'src/app/models/entities/car';
import { CarDetailsDto } from 'src/app/models/dtos/carDetailsDto';
import { CarImage } from 'src/app/models/entities/carImage';
import { Color } from 'src/app/models/entities/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit {
  cars:CarDetailsDto[]=[];
  carImages:CarImage[]=[];
  brands: Brand[] = [];
  colors: Color[] = [];

  imageUrl="https://localhost:44322/Uploads/Images/"
  imageOfPath:string;

  filterText="";
  cardetailFilter='';
  brandFilter: number=0;
  colorFilter: number=0;
  branddFilter:number=0;
  colorrFilter:number=0;


  constructor(private activatedRoute:ActivatedRoute,
    private carService:CarService, 
    private brandService:BrandService,
    private colorService:ColorService,
    private carImageService:CarImageService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {

    this.getBrands();
    this.getColors();
    

    this.activatedRoute.params.subscribe(params=>{
      if(params["colorId"] && params["brandId"]){
        this.getCarDetailsByColorAndBrand(params["colorId"],params["brandId"])
      }
      
      else if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }
      
      else if(params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      }
      else {
        this.getCars();
      }
    })
  }
  
  getCars(){
    this.carService.getCars().subscribe(response=>{this.cars=response.data});
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{this.brands=response.data});
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{this.colors=response.data});
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarByBrand(brandId).subscribe(response=>{
      this.cars=response.data;
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarByColor(colorId).subscribe(response=>{
      this.cars=response.data;
    })
  }

  getSelectedBrand(brandId: number) {
    debugger;
    if (this.brandFilter == brandId) return true;
    else return false;
  }

  getSelectedColor(colorId:number){
    if(this.colorFilter == colorId) return true;
    else return false;
  }

  getCarDetailsByColorAndBrand(colorId: number, brandId: number) {
    this.carService.getCarDetailsByColorAndBrand(colorId, brandId)
      .subscribe((response) => {
        console.log(response)
        this.cars = response.data;
      });
  }

  setFilter(){
    this.toastrService.success("filter applied")
    console.log("Filter")
  }

  image(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
      const imagePath=response.data[0].imagePath
      this.imageOfPath= this.imageUrl+imagePath;
      console.log(this.imageOfPath)
    })
    return this.imageOfPath
  }
}