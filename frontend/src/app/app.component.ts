import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BalaizApp';
  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService) {
      // Subscribe to authentication state changes
      this.oktaAuth.$authenticationState.subscribe(
        (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
      );
    }

    async ngOnInit() {
      // Get the authentication state for immediate use
      this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    }

    login() {
      this.oktaAuth.loginRedirect('/messages');
    }

    logout() {
      this.oktaAuth.logout('/login');
    }
}
