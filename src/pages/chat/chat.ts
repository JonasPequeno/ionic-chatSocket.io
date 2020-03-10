import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage implements OnInit {

  private messages = new Array<any>();
  private user: string;
  message: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private socket: Socket,
    private toast: ToastController
  ) { }

  ngOnInit(): void {
    this.user = this.navParams.get('user');

    this.socket.connect();
    this.socket.emit("user-connected", this.user);

    this.getUsers().subscribe((data: any) => {
      this.presentToas(`Usuario ${data.event} : ${data.user}`)
    });

    this.getMessages().subscribe((message: any) => {
      this.messages.push(message)
    });
  };

  getUsers() {
    let observeble = new Observable(observeble => {
      this.socket.on('users-changed', data => {
        observeble.next(data);
      })
    })
    return observeble;
  };

  getMessages() {
    let observeble = new Observable(observeble => {
      this.socket.on('message', data => {
        observeble.next(data);
      })
    })
    return observeble;
  };


  sendMessage() {
    this.socket.emit('message', {
      user: this.user,
      message: this.message,
      date: new Date,
    });

    this.message = "";
  };

  private presentToas(message) {
    this.toast.create({
      message,
      duration: 3000,
      position: 'middle'

    }).present();
  };

}
