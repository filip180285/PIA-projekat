import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private korisnikServis: UserService, private ruter: Router) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"))
  }

  ulogovan: Korisnik;
  trenutnaLozinka: string = "";
  novaLozinka1: string = "";
  novaLozinka2: string = "";

  promenaLozinke() {
    if (this.trenutnaLozinka == "" || this.novaLozinka1 == "" || this.novaLozinka2 == "") {
      alert("Morate uneti sva polja!");
      return;
    }
    else if (this.trenutnaLozinka != this.ulogovan.lozinka) {
      alert("Trenutna lozinka nije odgovarajuca!");
      return;
    }
    else if (
      /^.{8,16}$/.test(this.novaLozinka1) == false || /^[A-Za-z]/.test(this.novaLozinka1) == false
      || /[A-Z]+/.test(this.novaLozinka1) == false || /\d+/.test(this.novaLozinka1) == false
      || /[ !"#$%&'()*+,\-./:;<=>\\?@[\]^_`{|}~]+/.test(this.novaLozinka1) == false
    ) {
      alert("Nova lozinka mora biti dužine izmedju 8 i 16 karaktera, početi slovom, sadržati minimum jedno veliko slovo, broj i specijalni karakter!");
      return;
    }
    else if (this.novaLozinka1 != this.novaLozinka2) {
      alert("Lozinka i potvrda lozinke se ne poklapaju!");
      return;
    }
    this.korisnikServis.promeniLozinku(this.ulogovan.korisnickoIme, this.novaLozinka1).subscribe((resp) => {
      alert(resp["message"]);
      localStorage.clear();
      if (this.ulogovan.tip == "administrator") { this.ruter.navigate(["loginAdministrator"]); }
      else this.ruter.navigate(["login"]);
    })

  }

}
