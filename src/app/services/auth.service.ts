import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegistrationFormInterface} from '../interfaces/registration-form-interface';
import {LoginFormInterface} from '../interfaces/login-form-interface';
import {UserInterface} from '../interfaces/user-interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registrationResult: any;
  loginResult: any;
  user: UserInterface;
  APIURL = 'https://localhost:8443';
  constructor(private http: HttpClient) { }
  registration(registrationForm: RegistrationFormInterface) {
    this.http.post(this.APIURL + '/registration', registrationForm, {withCredentials: true}).subscribe(res => this.registrationResult = res);
    console.log(JSON.stringify(this.registrationResult));
  }
  login(loginForm: LoginFormInterface) {
    let body = new URLSearchParams();
    body.set('username', loginForm.username);
    body.set('password', loginForm.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'ru-RU,ru;q=0.9,en-US,en;q=0.5'
    });
    //'Accept-Language:': 'en-US,en;q=0.5'
    //'X-XSRF-TOKEN': 'reset'
    console.log(body.toString);
    this.http.post(this.APIURL + '/auth', body.toString(), { headers:
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'ru-RU,ru;q=0.9,en-US,en;q=0.5'
    }, withCredentials: true})
      .subscribe(res => this.loginResult = res);
    console.log('API returned user ' + JSON.stringify(this.user));
  }
  getUserInfo() {
      this.http.get<UserInterface>(this.APIURL + '/userInfoForSession', {withCredentials: true})
        .subscribe(userData => {
          this.user = userData;
          console.log('Logged in user: ' + JSON.stringify(this.user));
        });
      return this.user;
    }
  /*
    /*
  login(loginForm: LoginFormInterface) {
    let headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(loginForm.username + ':' + loginForm.password) });
    this.http.get<UserInterface>(this.APIURL + '/login',{headers}).subscribe(
      res => {
        this.loginResult = res;
        console.log('login result: ' + JSON.stringify(this.loginResult));
      }
  );
   */
    /*
    this.http.get<UserInterface>(this.APIURL + '/userInfoForSession', {withCredentials: true})
      .subscribe(userData => {
        this.user = userData;
        console.log('Logged in user: ' + JSON.stringify(this.user));
      });
     */
}
