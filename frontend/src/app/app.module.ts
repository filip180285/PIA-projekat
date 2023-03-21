import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GostComponent } from './gost/gost.component';
import { UcesnikComponent } from './ucesnik/ucesnik.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginAdministratorComponent } from './login-administrator/login-administrator.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { MeniUcesnikComponent } from './meni-ucesnik/meni-ucesnik.component';
import { MeniOrganizatorComponent } from './meni-organizator/meni-organizator.component';
import { MeniAdministratorComponent } from './meni-administrator/meni-administrator.component';
import { PonistavanjeLozinkeComponent } from './ponistavanje-lozinke/ponistavanje-lozinke.component';
import { Top5Component } from './top5/top5.component';
import { ZahteviRegistracijaComponent } from './zahtevi-registracija/zahtevi-registracija.component';
import { PregledZahtevaRegComponent } from './pregled-zahteva-reg/pregled-zahteva-reg.component';
import { PregledProfilaComponent } from './pregled-profila/pregled-profila.component';
import { NoviKorisnikComponent } from './novi-korisnik/novi-korisnik.component';
import { AzuriranjeKorisnikaComponent } from './azuriranje-korisnika/azuriranje-korisnika.component';
import { AzuriranjeUcesnikaComponent } from './azuriranje-ucesnika/azuriranje-ucesnika.component';
import { AzuriranjeKomentaraComponent } from './azuriranje-komentara/azuriranje-komentara.component';
import { UcesnikRadioniceComponent } from './ucesnik-radionice/ucesnik-radionice.component';
import { RadionicaPrikazComponent } from './radionica-prikaz/radionica-prikaz.component';
import { RadionicaUcestvovaoPrikazComponent } from './radionica-ucestvovao-prikaz/radionica-ucestvovao-prikaz.component';
import { PostaniOrganizatorComponent } from './postani-organizator/postani-organizator.component';
import { AdminRadioniceComponent } from './admin-radionice/admin-radionice.component';
import { PredlogPrikazComponent } from './predlog-prikaz/predlog-prikaz.component';
import { RadionicaPrikazAdminComponent } from './radionica-prikaz-admin/radionica-prikaz-admin.component';
import { AzuriranjeRadioniceComponent } from './azuriranje-radionice/azuriranje-radionice.component';
import { AdminNovaRadionicaComponent } from './admin-nova-radionica/admin-nova-radionica.component';
import { OrgNovaRadionicaComponent } from './org-nova-radionica/org-nova-radionica.component';
import { RadionicaPrikazOrgComponent } from './radionica-prikaz-org/radionica-prikaz-org.component';
import { RadionicaSablonComponent } from './radionica-sablon/radionica-sablon.component';

@NgModule({
  declarations: [
    AppComponent,
    GostComponent,
    UcesnikComponent,
    OrganizatorComponent,
    AdministratorComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    LoginAdministratorComponent,
    RegistracijaComponent,
    PromenaLozinkeComponent,
    MeniUcesnikComponent,
    MeniOrganizatorComponent,
    MeniAdministratorComponent,
    PonistavanjeLozinkeComponent,
    Top5Component,
    ZahteviRegistracijaComponent,
    PregledZahtevaRegComponent,
    PregledProfilaComponent,
    NoviKorisnikComponent,
    AzuriranjeKorisnikaComponent,
    AzuriranjeUcesnikaComponent,
    AzuriranjeKomentaraComponent,
    UcesnikRadioniceComponent,
    RadionicaPrikazComponent,
    RadionicaUcestvovaoPrikazComponent,
    PostaniOrganizatorComponent,
    AdminRadioniceComponent,
    PredlogPrikazComponent,
    RadionicaPrikazAdminComponent,
    AzuriranjeRadioniceComponent,
    AdminNovaRadionicaComponent,
    OrgNovaRadionicaComponent,
    RadionicaPrikazOrgComponent,
    RadionicaSablonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
