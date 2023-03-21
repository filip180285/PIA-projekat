import { Component, OnInit } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Radionica } from 'src/models/radionica';
import { WorkshopService } from 'src/services/workshop.service';

@Component({
  selector: 'app-org-nova-radionica',
  templateUrl: './org-nova-radionica.component.html',
  styleUrls: ['./org-nova-radionica.component.css']
})
export class OrgNovaRadionicaComponent implements OnInit {

  constructor(private radionicaServis: WorkshopService, private ruter: Router) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"));

    this.radionicaServis.dohvatiSablone(this.ulogovan.skice).subscribe((sabloni: []) => {
      this.sabloni = sabloni;
    })

    this.radionicaServis.dohvatiSveRadioniceAbs().subscribe((radionice: Radionica[]) => {
      this.radionice = radionice;
      if (this.radionice.length > 0) {
        this.id = this.radionice[this.radionice.length - 1].id + 1;
      }
    })
  }

  ulogovan: Korisnik;
  radionice: Radionica[] = [];
  sabloni: [];

  id: number = 1;
  naziv: string = "";
  mesto: string = "";
  adresa: string = "";
  datum: string = "";
  datumMS: number;
  kratakOpis: string = "";
  dugOpis: string = "";
  kapacitet: number = 5;
  kapString: string = ""
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

  /*
  onMultipleSubmit() {
    if (this.galerija != null) {
      const formData = new FormData();
      for (let img of this.galerija) {
        formData.append('files', img);
      }

      this.radionicaServis.posaljiSlike(formData).subscribe((res) => {
        console.log(res);
        if (res["message"]) { // ako ne valja tip neke slike
          alert(res["message"])

        }
        else { // ako je sve ok
          alert(res[1].originalname)
        }
      }
      );
    }
  }*/

  convertToDate(numOfMs) {
    return new Date(numOfMs);
  }

  dopuniPoljaUFormi(imeGlavneSlike, nizImenaGalerija) {
    let novi = new Date(this.datum);
    this.datumMS = novi.valueOf();
    //alert(imeSlike)
    const data = {
      id: this.id,
      naziv: this.naziv,
      organizator: this.ulogovan.korisnickoIme,
      glavnaSlika: imeGlavneSlike,
      mesto: this.mesto,
      adresa: this.adresa,
      datum: this.datumMS,
      kratakOpis: this.kratakOpis,
      dugOpis: this.dugOpis,
      galerija: JSON.stringify(nizImenaGalerija),
      kapacitet: this.kapacitet
    }
    this.radionicaServis.dodajPredlogRadionice(data).subscribe((res) => {
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
    this.kapacitet = parseInt(this.kapString)
    if (isNaN(this.kapacitet) || this.kapacitet <= 0 || this.kapacitet > 20) {
      alert("Kapacitet mora biti pozitivan broj izmedju 1 i 20!");
      return;
    }
    if (this.glavnaSlika == null || this.galerija == null) {
      alert("Morate uneti slike!");
      return;
    }
    if (this.galerija.length > 5) {
      alert("Možete uneti maksimalno 5 slika za radionicu!");
      return;
    }

    const formData = new FormData();
    const formDataGalery = new FormData();
    let imeGlavneSlike: string = ""
    let nizImenaGalerija = [];

    formData.append('file', this.glavnaSlika);
    this.radionicaServis.posaljiSliku(formData).subscribe((res) => {
      console.log(res);
      imeGlavneSlike = res["originalname"];
      if (res["originalname"]) { // ako je prosla provjera formata glavne slike
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
            this.dopuniPoljaUFormi(imeGlavneSlike, nizImenaGalerija);
          }
        });
      }
      else {
        alert(res["message"]);
        return;
      }
    });
  }

  sacuvajSablon(ime) {
    localStorage.setItem("sablon", JSON.stringify(this.sabloni[this.ulogovan.skice.indexOf(ime)]));
    this.ruter.navigate(['radionicaSablon']);
  }

}
