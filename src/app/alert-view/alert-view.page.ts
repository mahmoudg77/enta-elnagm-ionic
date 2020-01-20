import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-alert-view',
  templateUrl: './alert-view.page.html',
  styleUrls: ['./alert-view.page.scss'],
})
export class AlertViewPage implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.title="";
    this.message="";
    this.icon="";
    this.color="";
    this.next="/home";
    this.shared.alertViewObject=null;
  }
 
  @Input() title: string;
  @Input() message: string;
  @Input() icon: string;
  @Input() color: string;
  @Input() next: string="/home";

  constructor(private router:Router,private shared:SharedService) { }

  ionViewWillEnter(){this._ngOnInit();}
  ngOnInit() {}
  _ngOnInit() {
    this.title=this.shared.alertViewObject.title;
    this.message=this.shared.alertViewObject.message;
    this.icon=this.shared.alertViewObject.icon;
    this.color=this.shared.alertViewObject.color;
    this.next=this.shared.alertViewObject.next;
  }
  dismiss(){
    this.router.navigateByUrl(this.next);
  }

}
