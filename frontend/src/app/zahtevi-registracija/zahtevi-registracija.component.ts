import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { UserService } from 'src/services/user.service';
import { WorkshopService } from 'src/services/workshop.service';

@Component({
  selector: 'app-zahtevi-registracija',
  templateUrl: './zahtevi-registracija.component.html',
  styleUrls: ['./zahtevi-registracija.component.css']
})
export class ZahteviRegistracijaComponent implements OnInit {

  constructor(private korisnikServis: UserService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnikServis.dohvatiSveKorisnikeNaCekanju().subscribe((data: Korisnik[]) => {
      this.korisniciNaCekanju = data;
    })
  }

  sacuvajKorisnika(korisnik) {
    localStorage.setItem("zahtevReg", JSON.stringify(korisnik));
    //this.ruter.navigate(['pregledZahtevaReg']);
  }

  korisniciNaCekanju: Korisnik[];

}
