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
      this.presentToas(`User: ${data.event}: ${data.user}`)
    })
  }

  getUsers() {
    let observeble = new Observable(observeble => {
      this.socket.on('users-changed', data => {
        observeble.next();
      })
    })
    return observeble;
  }

  private presentToas(message) {
    this.toast.create({
      message,
      duration: 3000,
      position: 'meddle'
    }).present();
  }

}
