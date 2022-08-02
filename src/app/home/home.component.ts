import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SelectionService } from '../service/selection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
  sites = ['Sciences', 'Battelle', 'Uni-Mail'];
  
  // TODO : get locations and keep all sites and fill array based on that.
  ngOnInit(): void {

  }
}
