import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Komentar } from 'src/models/komentar';
import { Radionica } from 'src/models/radionica';
import { WorkshopService } from 'src/services/workshop.service';

@Component({
  selector: 'app-azuriranje-komentara',
  templateUrl: './azuriranje-komentara.component.html',
  styleUrls: ['./azuriranje-komentara.component.css']
})
export class AzuriranjeKomentaraComponent implements OnInit {

  constructor(private radionicaServis: WorkshopService, private ruter: Router) { }

  ngOnInit(): void {
    this.radionica = JSON.parse(localStorage.getItem("radionica"));
    this.komentar = JSON.parse(localStorage.getItem("komentar"));
  }

  radionica: Radionica;
  komentar: Komentar;

  azurirajKomentar() {
    this.radionica.komentari.forEach((e) => {
      if (e.idK == this.komentar.idK) {
        e.tekst = this.komentar.tekst;
      }
    });
    this.radionicaServis.azurirajKomentare(this.radionica.id, this.radionica.komentari).subscribe((resp) => {
      //console.log(resp["message"]);
      alert(resp["message"]);
      this.ruter.navigate(['ucesnik']);
    });
  }

  obrisiKomentar() {
    let index = 0;
    this.radionica.komentari.forEach((e) => {
      if (e.idK == this.komentar.idK) {
        this.radionica.komentari.splice(index, 1);
      }
      else { index++; }
    });
    this.radionicaServis.azurirajKomentare(this.radionica.id, this.radionica.komentari).subscribe((resp) => {
      //console.log(resp["message"]);
      alert(resp["message"]);
      this.ruter.navigate(['ucesnik']);
    });
  }

}
