import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title:string;
  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit() {}

  logout(){
    this.auth.logout(next=>this.router.navigateByUrl("/home"),error=>this.router.navigateByUrl("/home"));
  }
}
