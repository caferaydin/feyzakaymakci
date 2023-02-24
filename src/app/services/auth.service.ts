import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { SignInModel } from '../models/auth/signInModel';
import { SignUpModel } from '../models/auth/signUpModel';
import { TokenModel } from '../models/auth/tokenModel';
import { UserModel } from '../models/auth/userModel';
import { SingleResponseModel } from '../models/responseModel/singleResponseModel';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  decodedTokenKey:any
  user:UserModel

  apiUrl="https://localhost:44322/api/Auth/";
    constructor(
      private httpClient:HttpClient,
      private localStorageService:LocalStorageService,
      private jwtHelper:JwtHelperService) { }

  signIn(signInModel:SignInModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"signin",signInModel)
  }

    isAuthenticated(){
      if(localStorage.getItem("token")){
        return true;
        
      }
      else{
        return false;
      }
    }

    signUp(signUpModel:SignUpModel):Observable<SingleResponseModel<TokenModel>>{
      return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"signup",signUpModel)
    }

    decodedToken(token:any){
      return this.jwtHelper.decodeToken(token)
    }

    signedIn(){
      if(this.localStorageService.getToken()){
        return this.jwtHelper.isTokenExpired() 
      }
      else{
        return false;
      }
    }

    getUserInfo(){  //Burada tokenı saklıyoruz sakladığımız yerden çözümlediğimiz tokenı bir değişkene atıyoruz. Sonra bu değişken ile user ın bilgilerini tespit ediyoruz.
      let decodedToken = this.decodedToken(this.localStorageService.getToken())
      if (decodedToken) {
        if (this.signedIn()) {
          let tokenInfoName= Object.keys(decodedToken).filter(u=> u.endsWith('/name'))[0]
          var splitted=String(decodedToken[tokenInfoName]).split(" ")
          let firstName=splitted[0];
          let lastName=splitted[1]

          let tokenInfoId= Object.keys(decodedToken).filter(x=> x.endsWith('/nameidentifier'))[0]
          let userId= Number(decodedToken[tokenInfoId]);

          let claimInfo = Object.keys(decodedToken).filter(x=> x.endsWith('/role'))[0]
          let roles= decodedToken[claimInfo];
          console.log("role:",roles)

          let emailInfo= decodedToken.email; 
          
          this.user={
            userId:userId,
            firstName:firstName,
            lastName:lastName,
            email:emailInfo,
            roles:roles,
          }      
        }
      }
      return this.user;
    }
}
