import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Contract } from '../../model/contract.model';
import { ContractService } from '../../service/contract.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { StateService } from 'src/app/service/state.service';
import { Confirmation } from 'src/app/model/confirmation.model';
import { TranslatorService } from 'src/app/service/translator.service';

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
    public stateService: StateService,
    public translator: TranslatorService
  ) {}

  contract!: Contract;

  lockerId!: string;

  emailForm = this.formBuilder.group({ email: new FormControl() });
  phoneNumberForm = this.formBuilder.group({ phone_number: new FormControl() });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.lockerId = params.get('lockerId')!;
      this.contractService.getContractBy(this.lockerId)
      .subscribe((contract: Contract) => {
        this.contract = contract;
        this.emailForm.controls.email.setValue(this.contract.email);  // fill values of controls once we've got em
        this.phoneNumberForm.controls.phone_number.setValue(this.contract.phone_number);
      });
    });
  }

  deleteContract(lockerId: string) {
    this.contractService.delete(lockerId)
    .subscribe((deleted) => {
      this.reloadCurrentRoute();
    },
    (err) => { throw err; });
  }

  renewContract(lockerId: string) {
    this.contractService.renew(lockerId)
    .subscribe(
      (contr) => { 
        this.contract = contr;
        this.stateService.addConfirmation(new Confirmation("Contrat renouvelé avec succès", "success")); 
      },
      (err) => { this.stateService.addConfirmation(new Confirmation("Erreur de renouvellement de contrat, message : " + err.error.message, "danger")); }
    )
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
