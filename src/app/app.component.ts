import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'LockerFrontend';
  constructor(private router: Router) {
  }
  ngOnInit() {
    // here call rest api and get the sites
  }
}
