import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Radionica } from 'src/models/radionica';
import { WorkshopService } from 'src/services/workshop.service';

@Component({
  selector: 'app-radionica-sablon',
  templateUrl: './radionica-sablon.component.html',
  styleUrls: ['./radionica-sablon.component.css']
})
export class RadionicaSablonComponent implements OnInit {

  constructor(private radionicaServis: WorkshopService, private ruter: Router) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"));
    this.skica = JSON.parse(localStorage.getItem("sablon"));

    this.radionicaServis.dohvatiSveRadioniceAbs().subscribe((radionice: Radionica[]) => {
      this.radionice = radionice;
      if (this.radionice.length > 0) {
        this.id = this.radionice[this.radionice.length - 1].id + 1;
      }
    });

    this.naziv = this.skica["naziv"];
    this.mesto = this.skica["mesto"];
    this.adresa = this.skica["adresa"];
    this.kratakOpis = this.skica["kratakOpis"];
    this.dugOpis = this.skica["dugOpis"];
    this.glavnaSlika = this.skica["glavnaSlika"];
    this.galerija = this.skica["slike"];
    

    let d = this.convertToDate(this.skica["datum"]);
    let dan = "";
    if (d.getDate() < 10) {
      dan += "0"
    }
    dan += d.getDate();
    let mesec = "";
    if ((d.getMonth() + 1) < 10) {
      mesec += "0"
    }
    mesec += (d.getMonth() + 1);
    this.datum = d.getFullYear() + "-" + mesec + "-" + dan;
  }

  ulogovan: Korisnik;
  radionice: Radionica[] = [];
  skica;

  id: number = 1;
  naziv: string = "";
  mesto: string = "";
  adresa: string = "";
  datum: string = "";
  datumMS: number;
  kratakOpis: string = "";
  dugOpis: string = "";
  kapacitet: number = 5;
  kapString: string = "";
  glavnaSlika: string = ""
  galerija: Array<string> = [];

  convertToDate(numOfMs) {
    return new Date(numOfMs);
  }

  izbaciSliku(slika) {
    if(this.galerija.length == 2) {
      alert("Mora biti bar 2 slike u galeriji!");
      return;
    }
    this.galerija.splice(this.galerija.indexOf(slika), 1);
  }

  dopuniPoljaUFormi() {
    let novi = new Date(this.datum);
    this.datumMS = novi.valueOf();
    if(this.datumMS < Date.now()) {
      alert("Izabrali ste datum u prošlosti!")
      return;
    }
    //alert(imeSlike)
    const data = {
      id: this.id,
      naziv: this.naziv,
      organizator: this.ulogovan.korisnickoIme,
      glavnaSlika: this.glavnaSlika,
      mesto: this.mesto,
      adresa: this.adresa,
      datum: this.datumMS,
      kratakOpis: this.kratakOpis,
      dugOpis: this.dugOpis,
      galerija: JSON.stringify(this.galerija),
      kapacitet: this.kapacitet
    }
    this.radionicaServis.dodajPoSkici(data).subscribe((res) => {
      alert(res["message"]);
      this.ruter.navigate(['organizator']);
    })
  }

  posaljiPredlogZaRadionicu() {
    if (this.naziv == "" || this.mesto == "" || this.adresa == "" ||
      this.datum == "" || this.kratakOpis == "" || this.dugOpis == "" || this.kapString == "") {
      alert("Morate popuniti sva polja!");
      return;
    }
    this.kapacitet = parseInt(this.kapString);
    if (isNaN(this.kapacitet) || this.kapacitet <= 0 || this.kapacitet > 20) {
      alert("Kapacitet mora biti pozitivan broj izmedju 1 i 20!");
      return;
    }
    this.dopuniPoljaUFormi();
  }

}
