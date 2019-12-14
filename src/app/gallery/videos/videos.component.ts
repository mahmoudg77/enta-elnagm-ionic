import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  gallery:any[]=[];

  constructor() { }

  ngOnInit() {
    for (let index = 474; index < 500; index++) {
      this.gallery.push("https://picsum.photos/id/"+index+"/200/200");
    }
  }

}
