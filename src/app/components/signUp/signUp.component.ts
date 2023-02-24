import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormControl,FormBuilder,} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css'],
})
export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createSignUpForm();
  }

  createSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  signUp() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      let signUpModel = Object.assign({}, this.signUpForm.value);
      this.authService.signUp(signUpModel).subscribe(
        (response) => {
          this.toastrService.info(response.message);
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['cars']);
          this.toastrService.success(response.message, 'Registered.');
        },
        (responseError) => {
          this.toastrService.error(responseError.error)
        }
      );
    } else {
      this.toastrService.error('Form invalid.')
    }
  }
}