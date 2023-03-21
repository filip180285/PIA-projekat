import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNovaRadionicaComponent } from './admin-nova-radionica/admin-nova-radionica.component';
import { AdminRadioniceComponent } from './admin-radionice/admin-radionice.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { AzuriranjeKomentaraComponent } from './azuriranje-komentara/azuriranje-komentara.component';
import { AzuriranjeKorisnikaComponent } from './azuriranje-korisnika/azuriranje-korisnika.component';
import { AzuriranjeRadioniceComponent } from './azuriranje-radionice/azuriranje-radionice.component';
import { AzuriranjeUcesnikaComponent } from './azuriranje-ucesnika/azuriranje-ucesnika.component';
import { GostComponent } from './gost/gost.component';
import { LoginAdministratorComponent } from './login-administrator/login-administrator.component';
import { LoginComponent } from './login/login.component';
import { NoviKorisnikComponent } from './novi-korisnik/novi-korisnik.component';
import { OrgNovaRadionicaComponent } from './org-nova-radionica/org-nova-radionica.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { PonistavanjeLozinkeComponent } from './ponistavanje-lozinke/ponistavanje-lozinke.component';
import { PostaniOrganizatorComponent } from './postani-organizator/postani-organizator.component';
import { PredlogPrikazComponent } from './predlog-prikaz/predlog-prikaz.component';
import { PregledProfilaComponent } from './pregled-profila/pregled-profila.component';
import { PregledZahtevaRegComponent } from './pregled-zahteva-reg/pregled-zahteva-reg.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RadionicaPrikazAdminComponent } from './radionica-prikaz-admin/radionica-prikaz-admin.component';
import { RadionicaPrikazOrgComponent } from './radionica-prikaz-org/radionica-prikaz-org.component';
import { RadionicaPrikazComponent } from './radionica-prikaz/radionica-prikaz.component';
import { RadionicaSablonComponent } from './radionica-sablon/radionica-sablon.component';
import { RadionicaUcestvovaoPrikazComponent } from './radionica-ucestvovao-prikaz/radionica-ucestvovao-prikaz.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { Top5Component } from './top5/top5.component';
import { UcesnikRadioniceComponent } from './ucesnik-radionice/ucesnik-radionice.component';
import { UcesnikComponent } from './ucesnik/ucesnik.component';
import { ZahteviRegistracijaComponent } from './zahtevi-registracija/zahtevi-registracija.component';

const routes: Routes = [
  { path: "", component: GostComponent },
  { path: "top5", component: Top5Component },
  { path: "login", component: LoginComponent },
  { path: "loginAdministrator", component: LoginAdministratorComponent },
  { path: "registracija", component: RegistracijaComponent },
  { path: "promenaLozinke", component: PromenaLozinkeComponent },
  { path: "ponistavanjeLozinke", component: PonistavanjeLozinkeComponent },
  { path: "ucesnik", component: UcesnikComponent },
  { path: "organizator", component: OrganizatorComponent },
  { path: "administrator", component: AdministratorComponent },
  { path: "zahteviRegistracija", component: ZahteviRegistracijaComponent },
  { path: "pregledZahtevaReg", component: PregledZahtevaRegComponent },
  { path: "pregledProfila", component: PregledProfilaComponent },
  { path: "noviKorisnik", component: NoviKorisnikComponent },
  { path: "azuriranjeKorisnika", component: AzuriranjeKorisnikaComponent },
  { path: "azuriranjeUcesnika", component: AzuriranjeUcesnikaComponent },
  { path: "azuriranjeKomentara", component: AzuriranjeKomentaraComponent },
  { path: "ucesnikRadionice", component: UcesnikRadioniceComponent },
  { path: "radionicaPrikaz", component: RadionicaPrikazComponent },
  { path: "radionicaUcestvovaoPrikaz", component: RadionicaUcestvovaoPrikazComponent },
  { path: "postaniOrganizator", component: PostaniOrganizatorComponent },
  { path: "adminRadionice", component: AdminRadioniceComponent },
  { path: "predlogPrikaz", component: PredlogPrikazComponent },
  { path: "radionicaPrikazAdmin", component: RadionicaPrikazAdminComponent },
  { path: "adminNovaRadionica", component: AdminNovaRadionicaComponent },
  { path: "azuriranjeRadionice", component: AzuriranjeRadioniceComponent },
  { path: "orgNovaRadionica", component: OrgNovaRadionicaComponent },
  { path: "radionicaPrikazOrg", component: RadionicaPrikazOrgComponent },
  { path: "radionicaSablon", component: RadionicaSablonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
