import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})



export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user) {
    return this.http.post('http://localhost:8080/api/user/create', user);
  }

}
