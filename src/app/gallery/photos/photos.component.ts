import { environment } from './../../../environments/environment';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/bll/articles.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  gallery:any[]=[];
  lang: string="en";
  constructor(
    private postService:PostService,
    private translate:TranslateService,
    public shared:SharedService,
    private load:LoadingService
  ) { }
  public environment=environment;
  ionViewWillEnter(){this._ngOnInit();}
  ngOnInit() {}
  _ngOnInit() {
    this.lang=this.translate.currentLang;
    this.load.present();
    this.postService.getPostsByCat('photos',{},next=>{this.gallery=next;this.load.dismiss();},error=>{this.load.dismiss();});

    // for (let index = 300; index < 330; index++) {
    //   this.gallery.push("https://picsum.photos/id/"+index+"/200/200");
    // }
  }
   
}
