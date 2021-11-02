import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {


  signinForm: FormGroup
  signupForm: FormGroup;
  loading = false
  submitted = false
  signinFlag = 2
  showRegiterForm = false
  loader = false
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private commonService: CommonService
  ) {

    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit() {
    localStorage.clear()
    this.signupForm.reset()
    this.signinForm.reset()
  }

  get signupFormControls() { return this.signupForm.controls; }

  onRegisterSubmit() {
    this.submitted = true
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true
    let data = JSON.parse(JSON.stringify(this.signupForm.value))
    delete data['agreement']
    console.log('Form Values--> 1', data)
    this.submitted = false
    this.accountService.requestForRegisterUser(data).then((response: any) => {
      if (response) {
        this.loading = false
        this.commonService.showSuccess("Login with your email", "Register Successfully")
        this.signupForm.reset()
        this.showRegiterForm = false
        // this.router.navigate(['/login'])
      }
    }).catch(err => {
      this.loading = false
      this.commonService.showError(err['message'], "Please Try again!")
    });

  }

  get signinFormControls() {
    return this.signinForm.controls
  }

  showSkeleton = false;
  onSubmit() {
    this.submitted = true
    console.log(this.signinForm.value)
    // stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    }
    let data = JSON.parse(JSON.stringify(this.signinForm.value))
    this.loading = true
    this.submitted = false
    this.accountService.loginUser(data).then((response: any) => {
      this.loading = false
      let user = JSON.parse(response)
      console.log('This is api response from Login api-->', user)
      localStorage.setItem('token', user['token'])
      localStorage.setItem('user', response)
      this.commonService.setUser(user)
      if (response) {
        this.router.navigate(['/home'])
      }
    }).catch((err: any) => {
      this.loading = false
      this.commonService.showError(err['message'], "Please Try again!")
    });

  }




}
