import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { CommonService } from '../services/common.service';
import { WindowService } from '../services/window.service';
import { HttpClient } from '@angular/common/http';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { ReCaptchaV3Service } from 'ng-recaptcha';



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

  phoneNumber = '923157682557'
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private commonService: CommonService,
    private windowSer: WindowService,
    private httpClint: HttpClient,
    private recaptchaV3Service: ReCaptchaV3Service,

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

  executeImportantAction() {
    console.log('token--->')
    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) =>
        this.hitBackendAPI(token)
      );
  }

  hitBackendAPI(token: any) {
    // console.log('token--- api>', token)
    let body = {
      phoneNumber: this.phoneNumber,
      recapchaToken: token,
    }
    console.log('token--- api>', body)
    this.httpClint.post('http://localhost:5000/api/v1/drivers/onboarding/initverify', body)


  }
  windowRef: any
  recaptchaverifier: any;
  // myRecaptcha:any //= new FormControl(false);

  myRecaptcha: FormControl = new FormControl()

  onScriptLoad() {
    console.log('Google reCAPTCHA loaded and is ready for use!')
  }

  onScriptError() {
    console.log('Something went long when loading the Google reCAPTCHA')
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  ngOnInit() {
    this.myRecaptcha.valueChanges.subscribe(token => {
      console.log('token--->', token)
      this.httpClint.post('http://localhost:5000/api/v1/drivers/onboarding/initverify', { phoneNumber: '+923157682557', recapchaToken: token })

    })

    this.windowRef = this.windowSer.windowRef;
    this.recaptchaverifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response: any) => {
        this.httpClint.post('http://localhost:5000/api/v1/drivers/onboarding/initverify', { phoneNumber: '923157682557', recapchaToken: response })

      }
    }, auth);

    localStorage.clear()
    this.signupForm.reset()
    this.signinForm.reset()
  }

  verifyPhoneNumber() {
    this.submitted = false
    if (this.phoneNumber.length < 7) {
      this.submitted = false
      return
    }
    let that = this
    that.httpClint.post('http://localhost:5000/api/v1/drivers/onboarding/initverify', { phoneNumber: that.phoneNumber, recapchaToken: that.recaptchaverifier })

    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sendCode', {
    //   'size': 'invisible',
    //   'callback': function (recapchaToken: any) {
    //     // reCAPTCHA solved, send recapchaToken and phone number to backend.
    //     // a REST call to your backend
    //     that.httpClint.post('http://localhost:5000/api/v1/drivers/onboarding/initverify', { phoneNumber: that.phoneNumber, recapchaToken:that.recaptchaVerifier })
    //     // that.httpClint.post({
    //     //   url: 'http://localhost:5000/api/v1/drivers/onboarding/initverify',
    //     //   body: {
    //     //     phoneNumber: this.phoneNumber,
    //     //     recapchaToken,
    //     //   }
    //     // });
    //   }
    // });

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
