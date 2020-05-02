import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserInterface} from '../../interfaces/user-interface';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  userInfo: UserInterface;
  constructor(private authService: AuthService) {
    console.log('user info in authService is: ' + JSON.stringify(authService.getUserInfoFromSessionStorage()));
    this.userInfo = authService.getUserInfoFromSessionStorage();
  }
  ngOnInit(): void {
  }

}
