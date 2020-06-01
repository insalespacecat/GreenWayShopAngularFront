import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  goToAdmin(){
    this.authService.enableAdminMode();
  }



  ngOnInit(): void {
  }


}
