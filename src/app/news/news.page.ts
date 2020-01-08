import { SharedService } from './../services/shared.service';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/bll/articles.service';
import { TranslateService } from '@ngx-translate/core';

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
    public shared:SharedService
    ) { }
  public environment=environment;
  ngOnInit() {
    this.lang=this.translate.currentLang;
    this.postService.getPosts('Blogs',{},next=>this.posts=next);

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
