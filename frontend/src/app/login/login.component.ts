import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private korisnikServis: UserService, private ruter: Router) { }

  ngOnInit(): void {
  }

  korisnickoIme: string = "";
  lozinka: string = "";
  poruka: string = "";

  prijavaNaSistem() {
    if (this.korisnickoIme == "" || this.lozinka == "") {
      alert('Niste uneli podatke!');
      return;
    }
    this.korisnikServis.prijavaNaSistem(this.korisnickoIme, this.lozinka).subscribe((korisnik: Korisnik) => {
      if (!korisnik) {
        alert('Neispravni kredencijali!');
        return;
      }
      else {
        //alert(korisnik.lozinkaTrajeDo)
        if (korisnik.tip == "administrator") {
          alert('Pogrešan tip!');
          return;
        }
        // dodati provjeru da li je lozinka istekla
        let sad = new Date();
        //alert(korisnik.lozinkaTrajeDo)
        //alert(sad.valueOf())
        if (korisnik.lozinkaTrajeDo != -1 && sad.valueOf() > korisnik.lozinkaTrajeDo) {
          alert('Vaša privremena lozinka je istekla! Pošaljite zahtev za novu!');
          return;
        }
        localStorage.setItem('ulogovan', JSON.stringify(korisnik));
        if (korisnik.tip == "ucesnik") {
          this.ruter.navigate(['ucesnik']);
        }
        else if (korisnik.tip == "organizator") {
          this.ruter.navigate(['organizator']);
        }
      }
    })
  }

}
