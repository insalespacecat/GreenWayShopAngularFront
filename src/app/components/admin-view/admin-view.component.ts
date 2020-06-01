import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  constructor(private authService: AuthService) { }

  disableAdminMode(){
    this.authService.disableAdminMode();
  }

  ngOnInit(): void {
  }

}
