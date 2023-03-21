import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Radionica } from 'src/models/radionica';
import { UserService } from 'src/services/user.service';
import { WorkshopService } from 'src/services/workshop.service';

@Component({
  selector: 'app-ucesnik-radionice',
  templateUrl: './ucesnik-radionice.component.html',
  styleUrls: ['./ucesnik-radionice.component.css']
})
export class UcesnikRadioniceComponent implements OnInit {

  constructor(private korisnikServis: UserService, private radionicaServis: WorkshopService, private ruter: Router) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"));

    this.radionicaServis.dohvatiAktivneRadionice().subscribe((radionice: Radionica[]) => {
      this.aktivneRadionice = radionice;
    });

    this.korisnikServis.dohvatiSveKorisnike().subscribe((korisnici: Korisnik[]) => {
      this.korisnici = korisnici;
      this.korisnici.forEach((korisnik) => this.map.set(korisnik.korisnickoIme, korisnik));
    })

    this.korisnikServis.dohvatiKorisnika(this.ulogovan.korisnickoIme).subscribe((data: Korisnik) => {
      this.ulogovan = data;
      localStorage.setItem('ulogovan', JSON.stringify(this.ulogovan));
      // vraca samo aktivne koje je prijavio
      this.radionicaServis.dohvatiSveRadionicePrijavio(this.ulogovan.korisnickoIme).subscribe((radionice: Number[]) => {
        //alert(radionice);
        this.radionicaServis.dohvatiSveRadioniceID(radionice).subscribe((radionice: Radionica[]) => {
          this.radionice = radionice;
          this.sortiranjePoDatumu();
        });
      });
    });
  }

  sacuvajRadionicu(radionica) {
    localStorage.setItem("radionicaPrikaz", JSON.stringify(radionica));
    this.ruter.navigate(['radionicaPrikaz']);
  }

  convertToDate(numOfMs) {
    return new Date(numOfMs);
  }

  map: Map<String, Korisnik> = new Map();
  korisnici: Korisnik[] = [];

  ulogovan: Korisnik;
  radionice: Radionica[] = [];
  aktivneRadionice: Radionica[] = [];

  sortiranjePoDatumu() {
    this.radionice.sort((a, b) => {
      return a.datum - b.datum;
    });
  }

  provera12h(datum) {
    let sad = Date.now();
    if (sad + 12 * 60 * 60 * 1000 < datum) return true;
    else return false;
  }

  povuciPrijavu(radionica) {
    let index = radionica.prijavljeni.indexOf(this.ulogovan.korisnickoIme);
    radionica.prijavljeni.splice(index, 1);

    let indexRad = 0;
    this.radionice.forEach((e) => {
      if (e.id == radionica.id) {
        this.radionice.splice(indexRad, 1);
      }
      else { indexRad++; }
    });

    this.radionicaServis.azurirajPrijavljene(radionica.id, radionica.prijavljeni).subscribe((resp) => {
      console.log((resp["message"]));
      //alert(resp["message"]);
      //this.ruter.navigate(['ucesnikRadionice']);
    });

    if (radionica.kapacitet == 0) {
      radionica.cekajuNa.forEach((korisnik) => {
        if (this.map.get(korisnik) != null) {
          this.korisnikServis.posaljiMejlSlobodnoMesto(this.map.get(korisnik).mejl, radionica.naziv).subscribe((res) => {
            console.log(res["message"]);
          });
        }
      });
    }

    this.radionicaServis.povecajKapacitet1(radionica.id).subscribe((resp) => {
      console.log((resp["message"]));
      //radionica.kapacitet += 1; vrv ne treba
    });
  }

}
