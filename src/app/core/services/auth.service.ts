import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private _accessToken: string;
  private _expiresAt: number;

  constructor(public router: Router) {
    let tokenInfo = JSON.parse(localStorage.getItem('tokenInfo')) || {};
    this._accessToken = tokenInfo.accessToken || '';
    this._expiresAt = tokenInfo.expiresAt || 0;

    if(!this.isAuthenticated){
      this.logout();
    }
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get currentUserValue(): string {
    let user: any = {};
    let userDetail = JSON.parse(localStorage.getItem('userDetails'))
    user.name = userDetail.userName;
    user.role = userDetail.role; 													
    return user;
  }
   setToken(token): void {
    // Set the time that the Access Token will expire at
    var today = new Date();
    today.setHours(today.getHours() + 4);

    this._accessToken = token;
    this._expiresAt = today.getMilliseconds();

    let info = { 
      accessToken: this._accessToken, 
      expiresAt: this._expiresAt
    };

    localStorage.setItem("tokenInfo", JSON.stringify(info));
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._expiresAt = 0;
    localStorage.clear();
    this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    let date = new Date().getMilliseconds();
    return this._accessToken && (date < this._expiresAt);
  }

}