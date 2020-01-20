import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public modalController: ModalController) {

  }

  async present(title,message,icon,color) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        'title': title,
        'message': message,
        'icon': icon,
        'color':color
      },
      showBackdrop:false,
      animated:true

    });

    return await modal.present();
  }
 async error(title,message) {
    return await this.present(title,message,"close-circle","red");
 }
  async success(title,message) {
    return await this.present(title,message,"checkmark-circle","green");
  }
  async warning(title,message) {
    return await this.present(title,message,"information-circle","yellow");
  }
}
