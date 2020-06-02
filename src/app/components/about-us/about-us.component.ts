import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  animations: [
    trigger('fade',
      [
        transition('* => void', [
          style({opacity: 0}),
          animate(400)
        ]),
        transition('void => *',[
          style({opacity: 0}),
          animate(400)
        ])
      ])
  ]
})
export class AboutUsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  goToAdmin(){
    this.authService.enableAdminMode();
  }



  ngOnInit(): void {
  }


}
