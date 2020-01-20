import { SharedService } from './../services/shared.service';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/bll/articles.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
posts:any[]=[];
  lang: string;
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
    this.load.present();
    this.lang=this.translate.currentLang;
    this.postService.getPosts('Blogs',{},next=>{
      this.posts=next;
      this.load.dismiss();
    });
    
    // for (let index = 500; index < 520; index++) {
      
    //   this.posts.push(
    //     {
    //       title:"YouTube Data API Overview",
    //       time:"2019-12-02",
    //       description:"This document is intended for developers who want to write applications that interact with YouTube.",
    //       image:"https://picsum.photos/id/"+index+"/200/200",
    //     });
      
    // }
  }
    
   

}
