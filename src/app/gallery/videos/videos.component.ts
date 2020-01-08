import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/bll/articles.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/services/shared.service';
import {environment} from "src/environments/environment"
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
    public shared:SharedService
  ) { }
  public environment=environment;
  ngOnInit() {
    this.lang=this.translate.currentLang;
    this.postService.getPostsByCat('videos',{},next=>this.gallery=next);

    // for (let index = 300; index < 330; index++) {
    //   this.gallery.push("https://picsum.photos/id/"+index+"/200/200");
    // }
  }

}
