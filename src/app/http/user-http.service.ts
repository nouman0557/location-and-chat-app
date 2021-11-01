import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  apiEndPoints = {
    welcome: '',
    register: 'users/register',
    login: 'users/authenticate',
    allUser: '',
    updateUser: '',
    getSingleUser: '',
    deleteUser: ''
  }
  socket: any;

  constructor(
    private httpClint: HttpClient,
  ) { }



  registerUser(requestData: any) {
    return this.httpClint.post(environment.baseApiUrl + this.apiEndPoints.register, requestData)
  }

  loginUser(requestData: any) {
    return this.httpClint.post(environment.baseApiUrl + this.apiEndPoints.login, requestData)
  }


  setupSocketConnection() {
    console.log('Yes, Front end hit the server--->', environment.SOCKET_ENDPOINT)
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
      }
    });
  }

  SendMessage(message: string) {
    this.socket.emit('message', message);
  }

  testCall() {
    console.log('Yes, Front end hit the server--->', environment.baseApiUrl + this.apiEndPoints.welcome)

    this.httpClint.get<any>(environment.baseApiUrl + this.apiEndPoints.welcome,
      { observe: 'response' }).subscribe(response => {
        console.log('response--->', response);
      }, err => {
        console.log("Error----------->", err)
      })
  }

}