import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Contract } from '../../model/contract.model';
import { ContractService } from '../../service/contract.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { StateService } from 'src/app/service/State.service';
import { Confirmation } from 'src/app/model/confirmation.model';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html'
})
export class ContractComponent implements OnInit {
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private contractService: ContractService,
    private formBuilder: FormBuilder,
    public stateService: StateService
  ) {}

  @Input()
  contract!: Contract;

  emailForm = this.formBuilder.group({ email: new FormControl() });
  phoneNumberForm = this.formBuilder.group({ phone_number: new FormControl() });

  ngOnInit(): void {
    this.emailForm.controls.email.setValue(this.contract.email);  // fill values of controls once we've got em
    this.phoneNumberForm.controls.phone_number.setValue(this.contract.phone_number);
  }

  deleteContract(lockerId: string) {
    this.contractService.delete(lockerId)
    .subscribe((deleted) => {
      this.reloadCurrentRoute();
    },
    (err) => { throw err; });
  }
  
  updateEmail() {
    this.contract.email = this.emailForm.value.email!;
    this.contractService.update(this.contract)
    .subscribe(
      (cont) => {
        this.stateService.addConfirmation(new Confirmation("Email mis-à-jour avec succès", "success"));
      },
      (err) => {
        this.stateService.addConfirmation(new Confirmation("Format d'email incorrect, message : " + err.error.message, "danger"));
      }
    );
  }

  updatePhoneNumber() {
    this.contract.phone_number = this.phoneNumberForm.value.phone_number!;
    this.contractService.update(this.contract)
    .subscribe(
      (cont) => { 
        this.stateService.addConfirmation(new Confirmation("Numéro de natel mis-à-jour avec succès", "success"));
      },
      (err) => {
        this.stateService.addConfirmation(new Confirmation("Format de numéro de natel incorrect", "danger"));
      }
    );
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
