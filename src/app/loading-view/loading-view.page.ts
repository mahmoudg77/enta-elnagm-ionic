import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-view',
  templateUrl: './loading-view.page.html',
  styleUrls: ['./loading-view.page.scss'],
})
export class LoadingViewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.ngOnInit();
  }
}
