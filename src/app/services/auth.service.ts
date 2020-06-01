import {Injectable, OnInit} from '@angular/core';
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
  loginResult: any = null;
  user: UserInterface = null;
  isAuthenticated: boolean;
  APIURL = 'https://localhost:8443';
  constructor(private http: HttpClient) {
    if (this.getLoginStatusFromSessionStorage()) {
      this.user = JSON.parse(sessionStorage.getItem('UserInfo'));
    }
    this.isAuthenticated = JSON.parse(sessionStorage.getItem('isAuthenticated'));
  }
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
    console.log(body.toString);
    this.http.post(this.APIURL + '/auth', body.toString(), { headers: headers, withCredentials: true})
      .subscribe(res => {
        this.loginResult = res;
        console.log('login result: ' + JSON.stringify(this.loginResult));
        console.log('loginResult.code: ' + JSON.stringify(this.loginResult.code));
        /*
        if (this.loginResult.code === 200) {
          sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
          this.getLoginStatusFromSessionStorage();
        } else {
          sessionStorage.setItem('isAuthenticated', JSON.stringify(false));
          this.getLoginStatusFromSessionStorage();
        }
         */
      });
    sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
  }
  logout() {
    this.http.post(this.APIURL + '/dropAuth', {withCredentials: true});
    sessionStorage.removeItem('UserInfo');
    sessionStorage.setItem('isAuthenticated', JSON.stringify(false));
  }
  loadUserInfoFromAPI() {
    this.http.get<UserInterface>(this.APIURL + '/userInfoForSession', {withCredentials: true})
      .subscribe(userData => {
        this.user = userData;
        console.log('Logged in user: ' + JSON.stringify(this.user));
        sessionStorage.setItem('UserInfo', JSON.stringify(this.user));
      });
    return this.user;
  }
  getUserInfoFromSessionStorage() {
    this.user = JSON.parse(sessionStorage.getItem('UserInfo'));
    return this.user;
  }
  getLoginStatusFromSessionStorage() {
    this.isAuthenticated = JSON.parse(sessionStorage.getItem('isAuthenticated'));
    console.log("is authenticated: " + JSON.stringify(this.isAuthenticated));
    return this.isAuthenticated;
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
