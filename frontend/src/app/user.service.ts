import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class UserService {

  constructor(private http: HttpClient) { }


  createUser(user) {
    console.log(user);
    const headers = new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:8080/api/user/create', user);
  }

}
