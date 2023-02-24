import { Component, Inject, Input, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/entities/rental';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { RentalAddComponent } from '../rental-add/rental-add.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  carId: number;
  totalAmountInfo: number;
  rentalDay: number;
  modelRental: Rental;
  rentDate: Date;
  returnDate: Date;
  rentalId: number;

  constructor(
    private paymentService: PaymentService,
    private activetedRoue: ActivatedRoute,
    private toastrService: ToastrService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.activetedRoue.params.subscribe((param) => {
      console.log(param['carId']);
      if (param['carId']) {
        this.carId = Number(param['carId']);
      }
    });

    this.paymentService.currentData.subscribe((data) => {
      console.log('data:', data);
      this.rentDate = data.rentDate;
      this.returnDate = data.returnDate;
      //   this.totalPrice();
      this.totalAmount();
    });
  }

  add() {
    let rental: Rental = {
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      carId: this.carId,
      customerId: 0,
      rentalId: 0,
    };

    this.paymentService.add(rental).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.toastrService.success('Car was rented.');
      },
      (responseError) => {
        this.toastrService.error(responseError.error);
      }
    );
  }

  totalPrice() {
    /* bu kod, bir ödeme işlemi sırasında toplam 
  tutarın hesaplanması için gereken bilgileri toplar ve hesaplama 
  işlemini yapmak için bir hizmeti çağırır.*/

    const totalnfo = {
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      carId: this.carId,
    };
    console.log('total info metod', totalnfo);
    this.paymentService.totalPrice(totalnfo).subscribe((response) => {
      console.log(response);
    });
  }

  totalAmount() {
    /* 
    iki tarih arasındaki farkın gün cinsinden hesaplanması
     için yapılmaktadır.
    "duration" değişkeni, iki tarih arasındaki farkın kaç gün
     olduğunu ifade etmektedir. */
    const start = new Date(this.rentDate).getTime();
    const end = new Date(this.returnDate).getTime(); //dönüş tarihi
    const diff = end - start; //fark
    const duration = diff / (1000 * 60 * 60 * 24); //süre
    this.rentalDay = duration;
    console.log('geçen süre2', diff, 'geçen süre gün', duration);
    this.carService.getByCarId(this.carId).subscribe((response) => {
      const dailyPrice = response.data.dailyPrice;
      this.totalAmountInfo = duration * dailyPrice;
    });
  }
}
