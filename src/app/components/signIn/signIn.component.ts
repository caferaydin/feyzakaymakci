import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})
export class SignInComponent implements OnInit {
  
  signInForm:FormGroup;
  userEmail:string;

  @Input() user1:User; //@Input() ile bir bileşenden diğerine veri aktarımı sağlanmış olur.
  
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private userService:UserService,
    private router:Router,
    private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.createSignInForm()
    
  }
  
  createSignInForm(){
    this.signInForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
    })
  }

  signIn(){
    if (this.signInForm.valid) {
     // console.log(this.signInForm.value);
      let signInModel=Object.assign({},this.signInForm.value)
      this.authService.signIn(signInModel).subscribe(response=>{
        this.localStorage.saveToken(response.data.token)
        this.authService.decodedTokenKey=this.authService.decodedToken(response.data.token);
        console.log(this.authService.getUserInfo()); 
        this.router.navigate(["/"]);
        this.toastrService.info("Signed In")
        
      },responseError=>{
        //console.log(responseError);
        this.toastrService.error(responseError.error)
      })
    }
  }
}