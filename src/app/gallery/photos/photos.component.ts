import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  gallery:any[]=[];
  constructor() { }

  ngOnInit() {
    for (let index = 300; index < 330; index++) {
      this.gallery.push("https://picsum.photos/id/"+index+"/200/200");
    }
  }

}
