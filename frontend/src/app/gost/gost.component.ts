import { Component, OnInit } from '@angular/core';
import { Radionica } from 'src/models/radionica';
import { UserService } from 'src/services/user.service';
import { WorkshopService } from 'src/services/workshop.service';

@Component({
  selector: 'app-gost',
  templateUrl: './gost.component.html',
  styleUrls: ['./gost.component.css']
})
export class GostComponent implements OnInit {

  constructor(private korisnikServis: UserService, private radionicaServis: WorkshopService) { }

  ngOnInit(): void {
    //$("#a").text("promenaaaa");
    this.radionicaServis.dohvatiAktivneRadionice().subscribe((radionice: Radionica[]) => {
      this.radionice = radionice;
    });
  }

  convertToDate(numOfMs) {
    return new Date(numOfMs);
  }

  pretrazeno: boolean = false;
  radionice: Radionica[] = [];
  naziv: string = "";
  mesto: string = "";

  tip: string = "datum";
  kako: string = "rastuce";

  pozoviSort() {
    if (this.tip == "datum") this.sortiranjePoDatumu();
    else this.sortiranjePoNazivu();
  }

  /*
  ispisi() {
    alert(this.tip); alert(this.kako)
  }*/

  pretragaPoNazivuIMestu() {
    // dohvatiSveRadionice
    this.radionicaServis.dohvatiAktivneRadionice().subscribe((radionice: Radionica[]) => {
      this.radionice = radionice;
      this.radionice = this.radionice.filter(radionica => ((radionica.naziv).toLowerCase()).includes(this.naziv.toLowerCase()) && ((radionica.mesto).toLowerCase()).includes(this.mesto.toLowerCase()));
      this.pretrazeno = true;
      this.pozoviSort();
    });
  }

  sortiranjePoNazivu() {
    this.radionice.sort((a, b) => {
      if (a.naziv == b.naziv) {
        return 0;
      }
      if (this.kako == "rastuce") return a.naziv < b.naziv ? -1 : 1;
      else return a.naziv < b.naziv ? 1 : -1;
    });
  }

  sortiranjePoDatumu() {
    this.radionice.sort((a, b) => {
      if (this.kako == "rastuce") return a.datum - b.datum;
      else return b.datum - a.datum;
    });
  }

}
