import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Radionica } from 'src/models/radionica';
import { UserService } from 'src/services/user.service';
import { WorkshopService } from 'src/services/workshop.service';

@Component({
  selector: 'app-azuriranje-radionice',
  templateUrl: './azuriranje-radionice.component.html',
  styleUrls: ['./azuriranje-radionice.component.css']
})
export class AzuriranjeRadioniceComponent implements OnInit {

  constructor(private korisnikServis: UserService, private radionicaServis: WorkshopService, private ruter: Router) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"));
    this.radionica = JSON.parse(localStorage.getItem("radionicaAzuriranje"));
    this.id = this.radionica.id;
    this.naziv = this.radionica.naziv;
    this.mesto = this.radionica.mesto;
    this.adresa = this.radionica.adresa;
    let d = this.convertToDate(this.radionica.datum);

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
    this.kratakOpis = this.radionica.kratakOpis;
    this.dugOpis = this.radionica.dugOpis;
    this.staraGlavnaSlika = this.radionica.glavnaSlika;
    this.staraGalerija = this.radionica.slike;
  }

  radionica: Radionica;
  ulogovan: Korisnik;

  convertToDate(numOfMs) {
    return new Date(numOfMs);
  }

  id: number;
  naziv: string = "";
  mesto: string = "";
  adresa: string = "";
  datum: string = "";
  datumMS: number;
  kratakOpis: string = "";
  dugOpis: string = "";

  staraGlavnaSlika: string = "";
  staraGalerija = [];

  glavnaSlika: File = null;
  galerija: File[] = null;

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.glavnaSlika = file;
    }
  }

  selectMultipleImage(event) {
    if (event.target.files.length > 0) {
      this.galerija = event.target.files;
    }
  }


  dopuniPoljaUFormi(imeGlavneSlike, nizImenaGalerija) {
    let novi = new Date(this.datum);
    this.datumMS = novi.valueOf();
    //alert(imeSlike)
    const data = {
      id: this.id,
      naziv: this.naziv,
      glavnaSlika: imeGlavneSlike,
      staraGlavnaSlika: this.staraGlavnaSlika,
      mesto: this.mesto,
      adresa: this.adresa,
      datum: this.datumMS,
      kratakOpis: this.kratakOpis,
      dugOpis: this.dugOpis,
      galerija: JSON.stringify(nizImenaGalerija),
      staraGalerija: JSON.stringify(this.staraGalerija)
    }
    this.radionicaServis.azurirajRadionicu(data).subscribe((res) => {
      alert(res["message"]);
      this.ruter.navigate([this.ulogovan.tip]);
    })
  }

  azurirajRadionicu() {
    if (this.naziv == "" || this.mesto == "" || this.adresa == "" ||
      this.datum == "" || this.kratakOpis == "" || this.dugOpis == "") {
      alert("Polja ne smeju biti prazna!");
      return;
    }

    if (this.galerija != null && this.galerija.length > 5) {
      alert("Možete uneti maksimalno 5 slika za radionicu!");
      return;
    }

    let formData = new FormData();
    let formDataGalery = new FormData();
    let imeGlavneSlike: string = "";
    let nizImenaGalerija = [];


    if (this.glavnaSlika != null) {
      formData.append('file', this.glavnaSlika);
      this.radionicaServis.posaljiSliku(formData).subscribe((res) => {
        console.log(res);
        imeGlavneSlike = res["originalname"];
        if (res["originalname"]) { // ako je prosla provjera formata glavne slike
          if (this.galerija != null) {
            for (let img of this.galerija) { // saljemo galeriju
              formDataGalery.append('files', img);
            }
            this.radionicaServis.posaljiSlike(formDataGalery).subscribe((res: File[]) => {
              console.log(res);
              if (res["message"]) { // ako ne valja tip neke slike
                alert(res["message"])
                return;
              }
              else { // ako je sve ok
                for (let i = 0; i < res.length; i++) {
                  nizImenaGalerija.push(res[i]["originalname"]);
                }
                this.dopuniPoljaUFormi(imeGlavneSlike, nizImenaGalerija); // ok, ok
              }
            });
          }
          else { this.dopuniPoljaUFormi(imeGlavneSlike, null); } // ok, null
        }
        else { // nije prosla glavna slika, kraj
          alert(res["message"]);
          return;
        }
      });
    }

    else if (this.galerija != null) {
      for (let img of this.galerija) { // saljemo galeriju
        formDataGalery.append('files', img);
      }
      this.radionicaServis.posaljiSlike(formDataGalery).subscribe((res: File[]) => {
        console.log(res);
        if (res["message"]) { // ako ne valja tip neke slike
          alert(res["message"])
          return;
        }
        else { // ako je sve ok
          for (let i = 0; i < res.length; i++) {
            nizImenaGalerija.push(res[i]["originalname"]);
          }
          this.dopuniPoljaUFormi(null, nizImenaGalerija); // null, ok
        }
      });
    }
    else {
      this.dopuniPoljaUFormi(null, null); // null, null
    }
  }

}
