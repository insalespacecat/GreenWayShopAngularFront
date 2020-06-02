import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
  animations: [
    trigger('fade',
      [
        transition('* => void', [
          style({opacity: 0}),
          animate(150)
        ]),
        transition('void => *',[
          style({opacity: 0}),
          animate(150)
        ])
      ])
  ]
})
export class AdminViewComponent implements OnInit {

  constructor(private authService: AuthService) { }

  disableAdminMode(){
    this.authService.disableAdminMode();
  }

  ngOnInit(): void {
  }

}
