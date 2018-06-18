import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { map } from 'rxjs/operators';

interface Message {
   date: String,
   text: String
}

@Component({
  selector: 'app-messagelist',
  templateUrl: './messagelist.component.html',
  styleUrls: ['./messagelist.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Array<Message> [];

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) {
    this.messages = [];
  }

  async ngOnInit() {
    const accessToken = await this.oktaAuth.getAccessToken();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + accessToken
    });
    // Make request
    this.http.get(
      'http://localhost:8080/api/messages',
      new RequestOptions({ headers: headers })
    )
    .pipe(map(res => res.json()))
    .subscribe((messages) => messages.forEach(msg => this.messages.push(msg)));
  }
}
