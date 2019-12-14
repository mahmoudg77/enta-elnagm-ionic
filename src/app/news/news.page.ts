import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
posts:any[]=[];
  constructor() { }

  ngOnInit() {
    for (let index = 500; index < 600; index++) {
      this.posts.push(
        {
          title:"YouTube Data API Overview",
          time:"2019-12-02",
          description:"This document is intended for developers who want to write applications that interact with YouTube.",
          image:"https://picsum.photos/id/"+index+"/200/200",
        });
      
    }
  }
    
 

}
