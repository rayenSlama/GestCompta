import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor() { }

  authenticate(Télephone: string,password: string) {
    if (Télephone === "23454152" && password === "123456") {
      sessionStorage.setItem('Télephone', Télephone)
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('Télephone')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('Télephone')
  }
}
