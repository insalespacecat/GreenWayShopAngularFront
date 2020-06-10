import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {RegistrationFormInterface} from '../interfaces/registration-form-interface';
import {LoginFormInterface} from '../interfaces/login-form-interface';
import {UserInterface} from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registrationResult: any;
  user: UserInterface = null;
  isAuthenticated: boolean;
  token: string;
  APIURL = 'https://greenway-backend.herokuapp.com';
  constructor(private http: HttpClient) {
    if (this.getAuthenticationStatus()) {
      this.user = JSON.parse(localStorage.getItem('UserInfo'));
    }
    console.log('token is' + localStorage.getItem('token'));
  }


  registration(registrationForm: RegistrationFormInterface) {
    this.http.post(this.APIURL + '/registration', registrationForm, {withCredentials: true}).subscribe(res => this.registrationResult = res);
    console.log(JSON.stringify(this.registrationResult));
  }

  login(loginForm: LoginFormInterface) {

    this.http.post(this.APIURL + '/login', loginForm, {withCredentials: true, responseType: 'text', observe: 'response'})
      .subscribe(res => {
        console.log(JSON.stringify(res));
        console.log(res);
        localStorage.setItem('token', JSON.stringify(res.body));
      });

  }

  logout() {
    this.http.post(this.APIURL + '/dropAuth', {withCredentials: true});
    localStorage.removeItem('UserInfo');
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  loadUserInfoFromAPI() {
    let token = JSON.parse(localStorage.getItem('token'));
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'ru-RU,ru;q=0.9,en-US,en;q=0.5',
      'Authorization': 'Bearer ' + token } );
    this.loadUserInfoFromAPIToLocalStorage();
    return this.http.get<UserInterface>(this.APIURL + '/userInfoForSession', {headers: headers});
  }

  loadUserInfoFromAPIToLocalStorage() {
    let token = JSON.parse(localStorage.getItem('token'));
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'ru-RU,ru;q=0.9,en-US,en;q=0.5',
      'Authorization': 'Bearer ' + token } );
    this.http.get<UserInterface>(this.APIURL + '/userInfoForSession', {headers: headers}).subscribe(
      res => localStorage.setItem('UserInfo', JSON.stringify(res))
    );
  }

  getUserInfoFromLocalStorage() {
    this.user = JSON.parse(localStorage.getItem('UserInfo'));
    return this.user;
  }

  getAuthenticationStatus(){
    this.token = JSON.parse(localStorage.getItem('token'));
    if(this.token != null){
      this.isAuthenticated = true;
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }


  enableAdminMode() {
    localStorage.setItem("admin", JSON.stringify(true));
    console.log("ADMIN MODE ACTIVATED");
  }

  disableAdminMode() {
    localStorage.setItem("admin", JSON.stringify(false));
  }

  isInAdminMode() {
    return JSON.parse(localStorage.getItem("admin"));
  }

}
