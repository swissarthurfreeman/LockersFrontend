import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SelectionService } from '../service/selection.service';
import { Locker } from '../model/locker.model';
import { LockerService } from '../service/locker.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  constructor(
    private router: Router, 
    private lockerService: LockerService,
    private selectionService: SelectionService
  ) {}

  lockers: Locker[] = [];
  ngOnInit(): void {
    this.selectionService.locations.forEach((loc) => {
        this.lockerService.getLockersOf(loc)
        .subscribe((lockers) => {
            lockers.forEach((locker) => {
                this.lockers.push(locker);
            });
        })
    });
  }
}
