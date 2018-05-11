import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OktaAuthService } from '@okta/okta-angular';
import 'rxjs/Rx';

interface Message {
   date: String,
   text: String
}

@Component({
  selector: 'app-messagelist',
  templateUrl: './messagelist.component.html',
  styleUrls: ['./messagelist.component.css']
})
export class MessageListComponent implements OnInit{
  messages: Array<Message> [];

  constructor(private oktaAuth: OktaAuthService, private http: Http) {
    this.messages = [];
  }

  async ngOnInit() {
    const accessToken = await this.oktaAuth.getAccessToken();
    const headers = new Headers({
      Authorization: 'Bearer ' + accessToken
    });
    // Make request
    this.http.get(
      'http://localhost:8080/api/messages',
      new RequestOptions({ headers: headers })
    )
    .map(res => res.json())
    .subscribe((messages) => messages.forEach(msg => this.messages.push(msg)));
  }
}
