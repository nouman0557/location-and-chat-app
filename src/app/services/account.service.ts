import { Injectable } from '@angular/core';
import { UserHttpService } from '../http/user-http.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpserive: UserHttpService, private commonService: CommonService) { }

  requestForRegisterUser(user: any) {
    return new Promise((resolve, rejects) => {
      console.log('Data For Register from component-->', user)
      this.httpserive.registerUser(user).subscribe(
        response => {
          console.log('This is api response from register api-->', response)
          resolve(true)
        },
        err => {
          if (typeof err['error'] != 'string') {
            let err = {
              message: 'Something went wrong.'
            }
            rejects(err)
          } else {
            let error = JSON.parse(err['error'])
            rejects(error)
          }
          console.log("Register Api Response Error", err)
        })
    })

  }

  loginUser(user: any) {
    return new Promise((resolve, rejects) => {
      console.log('Data For Login  from component-->', user)
      this.httpserive.loginUser(user).subscribe(
        response => {
          resolve(response)
        },
        err => {
          if (typeof err['error'] != 'string') {
            let err = {
              message: 'Something went wrong.'
            }
            rejects(err)
          } else {
            let error = JSON.parse(err['error'])
            rejects(error)
          }
          console.log("Register Api Response Login Error-->", err)
        })

    })

  }



}
