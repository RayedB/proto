import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaAuthModule, OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';

const oktaConfig = {
  issuer: 'https://dev-874252.oktapreview.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: environment.oktaClientId
}

import { AppComponent } from './app.component';
import { MessageListComponent } from './messagelist/messagelist.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';

export const ROUTES: Routes = [
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'messages',
    component: MessageListComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    NavbarComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    OktaAuthModule.initAuth(oktaConfig),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
