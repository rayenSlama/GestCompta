import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule  } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { MatDialogModule,MatDialogRef, } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule  } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AppComponent } from './app.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';

import { AddFourComponent } from './fournisseur/add-four/add-four.component';
import { ListFourComponent } from './fournisseur/list-four/list-four.component';
import { HttpClientModule} from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';

import { AddmapComponent } from './map/addmap/addmap.component';
import { MenuComponent } from './menu/menu.component';


import { DatePipe } from '@angular/common';
import { AuthGuardService} from './auth/auth-guard.service';



import { AddInventComponent } from './invent/add-invent/add-invent.component';
import { ListInventComponent } from './invent/list-invent/list-invent.component';
import { ListLinventComponent } from './invent/list-linvent/list-linvent.component';
import { AddLinventComponent } from './invent/add-linvent/add-linvent.component';

import { AddTypefComponent } from './typefac/add-typef/add-typef.component';
import { ListTypefComponent } from './typefac/list-typef/list-typef.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { AccueilComponent } from './accueil/accueil.component';
import { Accueil1Component } from './accueil1/accueil1.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { HomeeComponent } from './homee/homee.component';

import { RootComponent } from './dashbord/root/root.component';
import { HomeComponent } from './dashbord/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ImagecardComponent } from './shared/imagecard/imagecard.component';
import { FigurecardComponent } from './shared/figurecard/figurecard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './dashbord/profile/profile.component';

import { TableComponent } from './dashbord/table/table.component';
import { MsgiconbtnComponent } from './msgiconbtn/msgiconbtn.component';

import { DeconnexionComponent } from './dashbord/deconnexion/deconnexion.component';
import { ProfilComponent } from './dashbord/profil/profil.component';
import { ListUserComponent } from './dashbord/list-user/list-user.component';


import { DetailsEcrtComponent } from './ecriture/details-ecrt/details-ecrt.component';
import { ListTiersComponent } from './tiers/list-tiers/list-tiers.component';
import { AddTiersComponent } from './tiers/add-tiers/add-tiers.component';
import { AddCompteComponent } from './compte/add-compte/add-compte.component';
import { ListCompteComponent } from './compte/list-compte/list-compte.component';
import { DetailTierComponent } from './tiers/detail-tier/detail-tier.component';
import { AddEcrtComponent } from './ecriture/add-ecrt/add-ecrt.component';
import { ListJournalComponent } from './ecriture/list-journal/list-journal.component';
import { DetailsUserComponent } from './dashbord/details-user/details-user.component';
import { EcrtcomptaComponent } from './dashbord/ecrtcompta/ecrtcompta.component';
import { GrandlivreComponent } from './ecriture/grandlivre/grandlivre.component';
import { BalanceComponent } from './ecriture/balance/balance.component';
import { JrncomptableComponent } from './ecriture/jrncomptable/jrncomptable.component';

const appRoutes : Routes = [
    {path: '', component:MenuComponent ,/*canActivate:[AuthGaurdService] ,*/children : [
   
    {path: 'invent', component: AddInventComponent},
    {path: 'typef', component: AddTypefComponent},
    {path: 'accueil', component: AccueilComponent},
    {path: 'accueil1', component: Accueil1Component},
    {path: 'comptes', component: ListCompteComponent},
    
    
    {path: 'fournisseurs', component: ListFourComponent},
    {path: 'fournisseur', component: AddFourComponent},
    {path: 'client', component: AddClientComponent},
    {path: 'compte', component: AddCompteComponent},
    {path: 'clients', component: ListClientComponent},
   
    {path: 'add-ecrt', component: AddEcrtComponent},
   {path: 'details-ecrt', component: DetailsEcrtComponent},
    
    {path: 'detail-tier/:id',component:DetailTierComponent},
   ]},
    {path: 'journal', component: ListJournalComponent},
    {path: 'jrncomptable', component: JrncomptableComponent},
    {path: 'grandLivre', component: GrandlivreComponent},
    {path: 'balance', component: BalanceComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'tiers', component: ListTiersComponent},

    {path: 'homee', component: HomeeComponent},
    
    
    {path: 'dashbord', component: RootComponent,/*canActivate:[AuthGaurdService] ,*/ children: [
      {path: '', component: HomeComponent},
      {path: 'profil', component: ProfilComponent},
      {path: 'details-user/:id',component:DetailsUserComponent},
      {path: 'table', component: TableComponent},
      {path: 'ecrtcompta', component: EcrtcomptaComponent},
      { path: 'list-user', component:ListUserComponent},
      { path: 'clients', component:ListClientComponent},
      {path: 'client', component: AddClientComponent},
      {path: 'tiers', component: ListTiersComponent},
      {path: 'fournisseurs', component: ListFourComponent},
      {path: 'fournisseur', component: AddFourComponent},
      { path: 'deconnexion', component:DeconnexionComponent}
    ]}
  ];
  @NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }