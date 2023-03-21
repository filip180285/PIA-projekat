import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-novi-korisnik',
  templateUrl: './novi-korisnik.component.html',
  styleUrls: ['./novi-korisnik.component.css']
})
export class NoviKorisnikComponent implements OnInit {

  constructor(private korisnikServis: UserService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnikServis.dohvatiSveKorisnike().subscribe((data: Korisnik[]) => {
      this.korisnici = data;
    })
  }

  korisnickoIme: string = "";
  lozinka: string = "";
  ime: string = "";
  prezime: string = "";
  mejl: string = "";
  telefon: string = "";
  nazivOrg: string = "";
  adresaOrg: string = "";
  matBrOrg: string = "";

  slika: File = null;

  korisnici: Korisnik[];

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
    }
    this.korisnikServis.dodajNovogKorisnika(data).subscribe((res) => {
      alert(res["message"]);
      this.ruter.navigate(['administrator']);
    })
  }

  dodajKorisnika() {
    if (this.ime == "" || this.korisnickoIme == "" || this.lozinka == "" ||
      this.prezime == "" || this.telefon == "" || this.mejl == "") {
      alert("Obavezna polja su ime, prezime , korisničko ime, lozinka, telefon i mejl!");
      return;
    }

    if (this.nazivOrg != "" || this.adresaOrg != "" || this.matBrOrg != "") {
      if (this.nazivOrg == "" || this.adresaOrg == "" || this.matBrOrg == "") {
        alert("Ukoliko želite da dodate organizatora, popunite polja za " +
          "naziv, adresu i matični broj organizacije");
        return;
      }
    }

    let jedinstvenoKorisnickoIme = true;
    this.korisnici.forEach((korisnik) => {
      if (korisnik.korisnickoIme == this.korisnickoIme) { jedinstvenoKorisnickoIme = false; }
    })
    if (jedinstvenoKorisnickoIme != true) {
      alert("Korisničko ime je zauzeto!");
      return;
    }

    let jedinstvenMejl = true;
    this.korisnici.forEach((korisnik) => {
      if (korisnik.mejl == this.mejl) { jedinstvenMejl = false; }
    })
    if (jedinstvenMejl != true) {
      alert("Mejl je već povezan sa jednim korisnikom!");
      return;
    }

    if (/^\+381 \d{2} \d{7}$/.test(this.telefon) == false) {
      alert("Telefon nije u dobrom formatu!");
      return;
    }

    if (/^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$/.test(this.mejl) == false) {
      alert("Mejl nije u dobrom formatu!");
      return;
    }

    // ako se registruje kao org
    if (this.nazivOrg != '') {
      if (/^\d{13}$/.test(this.matBrOrg) == false) {
        alert("Matični broj organizacije nije u dobrom formatu!");
        return;
      }
    }

    if (
      /^.{8,16}$/.test(this.lozinka) == false || /^[A-Za-z]/.test(this.lozinka) == false
      || /[A-Z]+/.test(this.lozinka) == false || /\d+/.test(this.lozinka) == false
      || /[ !"#$%&'()*+,\-./:;<=>\\?@[\]^_`{|}~]+/.test(this.lozinka) == false
    ) {
      alert("Lozinka mora biti dužine izmedju 8 i 16 karaktera, početi slovom, sadržati minimum jedno veliko slovo, broj i specijalni karakter!");
      return;
    }

    //slanje podataka
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
              // this.ruter.navigate(['administrator']);
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
      // this.ruter.navigate(['administrator']);
    }
  }

}
