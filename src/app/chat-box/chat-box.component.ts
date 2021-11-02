import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';
import { UserHttpService } from '../http/user-http.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  socket: any;
  message = ''

  messages: any = []
  constructor(
    private httpService: UserHttpService,
  ) { }

  ngOnInit() {
    this.setupSocketConnection()
  }

  sendMessage() {
    if (this.message == '') {
      return
    }
    this.socket.emit('message', this.message);
    let msgObj = {
      text: this.message,
      msgTypeSent: true
    }
    this.messages.push(msgObj)
    this.message = ''
  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (message: string) => {
      if (message) {
        let msgObj = {
          text: message,
          msgTypeSent: false
        }
        this.messages.push(msgObj)
      }
    });
  }

}
