import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// here we gotta query the api filtering locations at the app site
// and dump them into an array. We also get statuses of lockers.

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html'
})
export class SiteComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  siteName: string | null | undefined;
  locations = ['scIII', 'scII', 'EPA'];
  statuses = ['Rupture de Contract', 'Occupé', 'Hors Service', 'Libre'];

  ngOnInit(): void {
    // subscriber design pattern, on change of this the component adapts
    this.route.paramMap.subscribe(params => { 
      this.siteName = params.get('name');
    });
  }
}
