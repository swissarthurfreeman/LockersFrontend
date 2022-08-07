import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteComponent } from './site/site.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navigation/navbar.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { LockerComponent } from './detail/locker/locker.component';
import { ContractComponent } from './detail/contract/contract.component';
import { DetailComponent } from './detail/detail.component';
import { UserContractsComponent } from './userContracts/usercontracts.component';
import { AboutComponent } from './navigation/about/about.component';
import { ContactComponent } from './navigation/contact/contact.component';
import { NotFound } from './navigation/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteComponent,
    NavbarComponent,
    HomeComponent,
    ListComponent,
    LockerComponent,
    ContractComponent,
    DetailComponent,
    UserContractsComponent,
    AboutComponent,
    ContactComponent,
    NotFound
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}