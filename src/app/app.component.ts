import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
export class AppComponent {
  title = 'GreenWayShop';
  constructor(private authService: AuthService){
  }
  isInAdminMode(){
    return this.authService.isInAdminMode();
  }
}
