import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { UserService } from 'src/services/user.service';
import { WorkshopService } from 'src/services/workshop.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor(private korisnikServis: UserService, private ruter: Router) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"));
    this.korisnikServis.dohvatiSveAktivneKorisnike().subscribe((data: Korisnik[]) => {
      this.aktivniKorisnici = data;
      this.aktivniKorisnici = this.aktivniKorisnici.filter((korisnik) => korisnik.tip != "administrator");
    })
  }

  sacuvajKorisnika(korisnik) {
    localStorage.setItem("korisnikProfil", JSON.stringify(korisnik));
    //this.ruter.navigate(['pregledZahtevaReg']);
  }

  ulogovan: Korisnik;
  aktivniKorisnici: Korisnik[] = [];

}
