import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-azuriranje-ucesnika',
  templateUrl: './azuriranje-ucesnika.component.html',
  styleUrls: ['./azuriranje-ucesnika.component.css']
})
export class AzuriranjeUcesnikaComponent implements OnInit {

  constructor(private korisnikServis: UserService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem("ulogovan"));
    this.korisnikServis.dohvatiSveKorisnike().subscribe((data: Korisnik[]) => {
      this.korisnici = data;
    });
    this.korisnickoIme = this.korisnik.korisnickoIme;
    this.lozinka = this.korisnik.lozinka;
    this.ime = this.korisnik.ime;
    this.prezime = this.korisnik.prezime;
    this.mejl = this.korisnik.mejl;
    this.telefon = this.korisnik.telefon;
    this.nazivOrg = this.korisnik.nazivOrganizacije;
    this.adresaOrg = this.korisnik.adresaOrganizacije;
    this.matBrOrg = this.korisnik.maticniBrojOrganizacije;
    this.staraSlika = this.korisnik.slika;
  }

  korisnik: Korisnik;

  korisnickoIme: string = "";
  lozinka: string = "";
  ime: string = "";
  prezime: string = "";
  mejl: string = "";
  telefon: string = "";
  nazivOrg: string = "";
  adresaOrg: string = "";
  matBrOrg: string = "";
  staraSlika: string = "";

  slika: File = null;


  korisnici: Korisnik[] = [];

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.slika = file;
    }
  }

  dopuniPoljaUFormi(imeSlike) {
    //alert(imeSlike)
    const data = {
      ime: this.ime,
      prezime: this.prezime,
      korisnickoIme: this.korisnickoIme,
      lozinka: this.lozinka,
      telefon: this.telefon,
      mejl: this.mejl,
      nazivOrg: this.nazivOrg,
      adresaOrg: this.adresaOrg,
      matBrOrg: this.matBrOrg,
      slika: imeSlike,
      staraSlika: this.staraSlika
    }
    this.korisnikServis.azurirajKorisnika(data).subscribe((res) => {
      alert(res["message"]);
      this.ruter.navigate(['ucesnik']);
    })
  }

  azurirajKorisnika() {
    if (this.ime == "" || this.prezime == "" || this.telefon == "") {
      alert("Prazna polja nisu dozvoljena!");
      return;
    }

    if (/^\+381 \d{2} \d{7}$/.test(this.telefon) == false) {
      alert("Telefon nije u dobrom formatu!");
      return;
    }

    // razmisliti da li preskociti provjeru za velicinu slike
    let formData = new FormData();

    if (this.slika != null) {
      formData.append('file', this.slika);
      this.korisnikServis.posaljiSliku(formData).subscribe((res) => {
        console.log(res);
        let imeSlike = res["originalname"];
        if (res["originalname"]) {
          this.korisnikServis.proveriVelicinuSlike(res["originalname"]).subscribe((res) => {
            //alert(res["message"]);
            if (res["message"] == "OK") {
              this.dopuniPoljaUFormi(imeSlike);
              //this.ruter.navigate(['administrator']);
            }
            else {
              alert(res["message"]);
            }
          })
        }
        else {
          alert(res["message"]);
        }
      }
      );
    }
    else {
      this.dopuniPoljaUFormi(null);
      //this.ruter.navigate(['administrator']);
    }
  }

}
