import { Component } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

import { AuthGuard } from './_helpers';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
  currentUser!: User;
  header!: boolean;
  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe((x) => {
      if(Object.keys(x).length > 0)
      this.currentUser = x;
    });
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if(AuthGuard){
          this.authenticationService.currentUser.subscribe((x) => {
            if(Object.keys(x).length > 0)
            this.currentUser = x;
          });
        }
      }
    })
  }
  
  logout() {
    this.currentUser = null as any;
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
