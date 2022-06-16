import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule  } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { MatDialogModule,MatDialogRef, } from '@angular/material/dialog';

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


import {NgxPaginationModule} from 'ngx-pagination';
import { AddTypefComponent } from './typefac/add-typef/add-typef.component';
import { ListTypefComponent } from './typefac/list-typef/list-typef.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { AccueilComponent } from './accueil/accueil.component';
import { SocieteComponent } from './societe/societe.component';
import { ParametreComponent } from './parametre/parametre.component';
import { Accueil1Component } from './accueil1/accueil1.component';
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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule} from '@angular/material/radio';
import { FooterComponent } from './shared/footer/footer.component';
import { ProfilComponent } from './dashbord/profil/profil.component';
import { AddUserComponent } from './dashbord/add-user/add-user.component';
import { ListUserComponent } from './dashbord/list-user/list-user.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TermPipe } from './term.pipe';
import { EditUserComponent } from './dashbord/edit-user/edit-user.component';
import { DetailsUserComponent } from './dashbord/details-user/details-user.component';
import { UniqueEmailValidatorDirectiveDirective } from './unique-email-validator-directive.directive';

import { DetailsEcrtComponent } from './ecriture/details-ecrt/details-ecrt.component';

import { ListCompteComponent } from './compte/list-compte/list-compte.component';
import { AddCompteComponent } from './compte/add-compte/add-compte.component';
import { AddTiersComponent } from './tiers/add-tiers/add-tiers.component';
import { ListTiersComponent } from './tiers/list-tiers/list-tiers.component';
import { DetailTierComponent } from './tiers/detail-tier/detail-tier.component';
import { AddEcrtComponent } from './ecriture/add-ecrt/add-ecrt.component';

import { ListJournalComponent } from './ecriture/list-journal/list-journal.component';
import { AddLecrtComponent } from './ecriture/add-lecrt/add-lecrt.component';
import { EcrtcomptaComponent } from './dashbord/ecrtcompta/ecrtcompta.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GrandlivreComponent } from './ecriture/grandlivre/grandlivre.component';
import { BalanceComponent } from './ecriture/balance/balance.component';
import { JrncomptableComponent } from './ecriture/jrncomptable/jrncomptable.component';


const MATERIAL_MODULES = [MatToolbarModule,
  MatIconModule,MatButtonModule, MatRadioModule, MatMenuModule
];


@NgModule({
  declarations: [
    AppComponent,
    AddClientComponent,
    ListClientComponent,
    AddFourComponent,
    ListFourComponent,
    RegisterComponent,
    LoginComponent,
    ListUserComponent,
    AddmapComponent,
    MenuComponent,
    
     AddInventComponent,
    ListInventComponent,
    ListLinventComponent,
    AddLinventComponent,
    AddTypefComponent,
    ListTypefComponent,
    AccueilComponent,
    SocieteComponent,
    ParametreComponent,
    Accueil1Component,
    HomeeComponent,
    RootComponent,
    HomeComponent,
    NavbarComponent,
    ImagecardComponent,
    FigurecardComponent,
    SidebarComponent,
    ProfileComponent,
    TableComponent,
    MsgiconbtnComponent,
    DeconnexionComponent,
    FooterComponent,
    ProfilComponent,
    AddUserComponent,
    TermPipe,
    EditUserComponent,
    DetailsUserComponent,
    UniqueEmailValidatorDirectiveDirective,
  
    DetailsEcrtComponent,
  
    ListCompteComponent,
    AddCompteComponent,
    AddTiersComponent,
    ListTiersComponent,
    DetailTierComponent,
    AddEcrtComponent,

    ListJournalComponent,
    AddLecrtComponent,
    EcrtcomptaComponent,
    GrandlivreComponent,
    BalanceComponent,
    JrncomptableComponent,

    

 
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AutocompleteLibModule,
    MatSliderModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    NgMatSearchBarModule,
    NgbModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatAutocompleteModule,
    MatMenuModule,
    Ng2SearchPipeModule,
  
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA1HgSr5yVLaAwcJBCoAMcOk1RlkKnCvTs',
      libraries: ['places']
    })
  ],
  exports : MATERIAL_MODULES,
  providers: [DatePipe,{ provide: MAT_DIALOG_DATA, useValue: {} ,},
    { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
