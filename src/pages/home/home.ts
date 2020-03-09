import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private user: string;

  constructor(
    public navCtrl: NavController,
    private modalController: ModalController
  ) { }

  openChat() {
    const modal = this.modalController.create(
      'ChatPage', { user: this.user }
    );
    modal.present();
  }

}
