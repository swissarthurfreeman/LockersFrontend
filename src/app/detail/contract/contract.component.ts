import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Contract } from '../../model/contract.model';
import { ContractService } from '../../service/contract.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html'
})
export class ContractComponent implements OnInit {
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private contractService: ContractService
  ) {}

  @Input()
  contract!: Contract;
  
  ngOnInit(): void {
    console.log("Contract View Rendered");
    console.log(this.contract);
  }
}
