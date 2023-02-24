import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/auth/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  userInfo:UserModel=this.authService.getUserInfo()

  constructor(private authService:AuthService, private localStorageService:LocalStorageService,private router:Router,private toastrservice:ToastrService) { }

  ngOnInit(): void {
    this.ngDoCheck()
  }


  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  logout(){
    this.localStorageService.removeToken();
    this.toastrservice.success("You have successfully signed out")
    this.router.navigate([""])
    //Biz burada localstorage ile token ı kaldırıyoruz router ile de anasayfaya yönlendiriyoruz.

  }

  ngDoCheck(){ 
  /* kullanıcı bilgilerinde herhangi bir değişiklik 
  olduğunda servisteki kullanıcı bilgileriyle senkronize edilir. */
    if(this.userInfo!==this.authService.user){
      this.userInfo = this.authService.user;
    }
  }

}