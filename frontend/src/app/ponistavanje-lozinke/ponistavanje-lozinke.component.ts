import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-ponistavanje-lozinke',
  templateUrl: './ponistavanje-lozinke.component.html',
  styleUrls: ['./ponistavanje-lozinke.component.css']
})
export class PonistavanjeLozinkeComponent implements OnInit {

  constructor(private korisnikServis: UserService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnikServis.dohvatiSveKorisnike().subscribe((data: Korisnik[]) => {
      this.korisnici = data;
    });
  }

  korisnici: Korisnik[] = [];
  mejl: string = "";
  mejlPotvrda: string = "";

  generisanjeLozinke() {
    let duzina = Math.floor(Math.random() * 9) + 8;
    let nizZnakova = [];
    let indeksi = [];
    for(let i = 0; i < duzina - 1; i++) {
      indeksi[i] = i + 1;
    }

    let i = duzina - 2;
    while (i > 0) {
        let tmp = indeksi[i];
        let zamena = Math.floor(Math.random() * i);
        indeksi[i] = indeksi[zamena];
        indeksi[zamena] = tmp;
        i--;
    }
    
    const karakteri ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 !#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    const slova = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const velikaSlova = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const cifre = "0123456789";
    const specijalniKarakteri = " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    nizZnakova[0] = slova[Math.floor(Math.random() * slova.length)];
    nizZnakova[indeksi.pop()] = velikaSlova[Math.floor(Math.random() * velikaSlova.length)];
    nizZnakova[indeksi.pop()] = cifre[Math.floor(Math.random() * cifre.length)];
    nizZnakova[indeksi.pop()] = specijalniKarakteri[Math.floor(Math.random() * specijalniKarakteri.length)];
    while(indeksi.length > 0) {
      nizZnakova[indeksi.pop()] = karakteri[Math.floor(Math.random() * karakteri.length)];
    }

    let lozinka = nizZnakova.join("");
    //alert(duzina);
    //alert(lozinka)
    return lozinka;
  }

  posaljiZahtev() {
    let sad = new Date();
    let trajanje = new Date();
    trajanje.setMinutes(sad.getMinutes() + 30);

    if (this.mejl == "" || this.mejlPotvrda == "") {
      alert("Morate uneti sva polja!");
      return;
    }
    else if (this.mejl != this.mejlPotvrda) {
      alert("Mejl i potvrda mejla se ne poklapaju!");
      return;
    }

    let validanMejl = false;
    this.korisnici.forEach((korisnik) => {
      // samo aktivan korisnik moze da mijenja lozinku
      if(korisnik.mejl == this.mejl && korisnik.status == "aktivan") { validanMejl = true; }
    })
    if(validanMejl == false) {
      alert("Mejl koji ste uneli nije povezan ni sa jednim nalogom!");
      return;
    }

    let sifra = this.generisanjeLozinke();

    this.korisnikServis.postaviPrivremenuLozinku(this.mejl, sifra, trajanje.valueOf()).subscribe((resp) => {
      alert(resp["message"]);
      this.ruter.navigate(['']);
    })
  }
  
}
