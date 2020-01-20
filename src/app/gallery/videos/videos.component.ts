import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/bll/articles.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/services/shared.service';
import {environment} from "src/environments/environment"
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
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
    this.postService.getPostsByCat('videos',{},
    next=>{
      this.gallery=next;
      this.load.dismiss();
    },err=>{
      this.load.dismiss();
    }
    );

    // for (let index = 300; index < 330; index++) {
    //   this.gallery.push("https://picsum.photos/id/"+index+"/200/200");
    // }
  }
   
}
