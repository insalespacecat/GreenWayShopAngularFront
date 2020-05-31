import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegistrationFormInterface} from '../interfaces/registration-form-interface';
import {LoginFormInterface} from '../interfaces/login-form-interface';
import {UserInterface} from '../interfaces/user-interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


//issue: Service logic requires send auth and reg forms twice
//because function returns a value faster than observable sets it.
export class AuthService {
<<<<<<< HEAD
  //query results
  registrationResult: any = null;
  loginResult: any = null;
  //API
  APIURL = 'https://localhost:8443';


  constructor(private http: HttpClient) {
    //Fix for: "Uncaught (in promise): TypeError: this.authService.get...FromSessionStorage(...) is null"
    sessionStorage.setItem('UserInfo', JSON.stringify({discount: null, shippingAddress: null, phoneNumber: null,
      username: null, name: null, active: null, authorities: null}));
    sessionStorage.setItem('isAuthenticated', JSON.stringify(false));
    sessionStorage.setItem('AuthenticationProcessed', null);
=======
  registrationResult: any;
  loginResult: any;
  user: UserInterface;
  APIURL = 'https://localhost:8443';
  constructor(private http: HttpClient) { }
  registration(registrationForm: RegistrationFormInterface) {
    this.http.post(this.APIURL + '/registration', registrationForm, {withCredentials: true}).subscribe(res => this.registrationResult = res);
    console.log(JSON.stringify(this.registrationResult));
>>>>>>> parent of 499ba46... development sync
  }

  //*****API QUERY METHODS******
  //REGISTRATION, LOGIN AND LOGOUT

  //Registration method sends registration form on API relying on HTTPS security channel
  //It expects answer with JSON body with properties STATUS, CODE, DETAILS
  //If code property is 201, then registration is considered as a success and var 'RegistrationError' is set to false
  //var registrationError is expected to be consumed immediately to show registration error annotation at the form.
  registration(registrationForm: RegistrationFormInterface): boolean {
    this.http.post(this.APIURL + '/registration', registrationForm, {withCredentials: true})
      .subscribe(res => {
        this.registrationResult = res;
        if (this.registrationResult.code === 201) {
          sessionStorage.setItem('registrationSuccessful', JSON.stringify(true));
        } else {
          sessionStorage.setItem('registrationSuccessful', JSON.stringify(false));
        }
      });
    return JSON.parse(sessionStorage.getItem('registrationSuccessful'));
}


//Login method also sends credentials on API relying on HTTPS security channel
  //I dont really like the format of login query: method formats username and password
  //as username="someusername"&password="somepassword" and puts them in request body.
  //But this is required by Spring's .formLogin() method with Basic authentication.

  //Here is the same pattern for processing login result which we seen in registration method,
  //server returns answer with JSON body
  //with status code, we use it to check is authentication successful or not, if not then
  //we the var loginError is set to true, and AuthService component will show error message at the form

  //User information after query is saved to sessionStorage because it is a demo APP and we don't want
  //to pollute users browsers with our info. Components are expected to use get...FromSessionStorage
  //methods in order to access required info about authentication status and user because local variables in service
  //are dropped whenever user refreshes the page: this could cause errors.
  login(loginForm: LoginFormInterface) {
    let body = new URLSearchParams();
    body.set('username', loginForm.username);
    body.set('password', loginForm.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'ru-RU,ru;q=0.9,en-US,en;q=0.5'
    });
<<<<<<< HEAD

    this.http.post(this.APIURL + '/auth', body.toString(), {headers: headers, withCredentials: true})
      .subscribe(res => {
        this.loginResult = res;
        if (this.loginResult.code === 200) {
          sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
          this.loadUserInfoFromAPI();
        } else {
          sessionStorage.setItem('isAuthenticated', JSON.stringify(false));
        }
        sessionStorage.setItem('AuthenticationProcessed', JSON.stringify(true));
      });
  }

  private loadUserInfoFromAPI() {
    this.http.get<UserInterface>(this.APIURL + '/userInfoForSession', {withCredentials: true})
      .subscribe(userData => {
        console.log('Logged in user: ' + JSON.stringify(userData));
        sessionStorage.setItem('UserInfo', JSON.stringify(userData));
      });
  }

  //Simple logout that queries API to delete session on server and deletes user info from sessionStorage
  //isAuthenticated property is set to false
  logout() {
    this.http.post(this.APIURL + '/dropAuth', {withCredentials: true});
    sessionStorage.removeItem('UserInfo');
    sessionStorage.setItem('isAuthenticated', JSON.stringify(false));
  }

  //Methods for components that allow consume userInfo and AuthenticationStatus
  getUserInfoFromSessionStorage() {
    try{
    return JSON.parse(sessionStorage.getItem('UserInfo'));
    } catch (exception) {
      console.info('Unable to retrieve user from session storage, userInfo is to be initialized with nulls');
      return {discount: null, shippingAddress: null, phoneNumber: null,
        username: null, name: null, active: null, authorities: null}
    }
  }
  getLoginStatusFromSessionStorage() {
    try{
    return JSON.parse(sessionStorage.getItem('isAuthenticated'));
    } catch (exception) {
      console.info('Unable to retrieve authentication status from session storage, returning false');
      return false;
    }
  }
  getIsAuthenticationProcessed(){
    try{
      return JSON.parse(sessionStorage.getItem('AuthenticationProcessed'));
    } catch (exception) {
      console.info('Unable to retrieve authentication processed from session storage, returning null');
      return null;
    }
  }
=======
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
>>>>>>> parent of 499ba46... development sync
}
