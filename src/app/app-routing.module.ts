import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './navigation/about/about.component';
import { ContactComponent } from './navigation/contact/contact.component';
import { NotFound } from './navigation/notfound/notfound.component';
import { SiteComponent } from './site/site.component';
import { UserContractsComponent } from './userContracts/usercontracts.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "site/:name", component: SiteComponent},
  {path: "site/:name/:lockerId", component: DetailComponent},
  {path: "contracts", component: UserContractsComponent},
  {path: "contact", component: ContactComponent},
  {path: "about", component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
