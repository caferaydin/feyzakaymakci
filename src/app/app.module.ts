import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { ColorComponent } from './components/color/color.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from './models/auth/tokenModel';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { SignInComponent } from './components/signIn/signIn.component';
import { SignUpComponent } from './components/signUp/signUp.component';


@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarComponent,
    CarImageComponent,
    ColorComponent,
    RentalComponent,
    NaviComponent,
    CarDetailComponent,
    PaymentComponent,
    RentalAddComponent,
    SignInComponent,
    SignUpComponent, 
    CarFilterPipe,
    ColorFilterPipe,
    BrandFilterPipe,
    FilterPipePipe,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
     }),
     JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:4200/"]
      },
    }),

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}  //şuan yetkilerde izin verildi.
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
