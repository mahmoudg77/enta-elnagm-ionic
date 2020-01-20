import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'mg-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() icon: string;
  @Input() color: string;

  constructor(navParams: NavParams,public modalController: ModalController) {
    // componentProps can also be accessed at construction time using NavParams
  }
  
  ngOnInit() {
    
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
