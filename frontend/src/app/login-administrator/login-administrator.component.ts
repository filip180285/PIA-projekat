import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login-administrator',
  templateUrl: './login-administrator.component.html',
  styleUrls: ['./login-administrator.component.css']
})
export class LoginAdministratorComponent implements OnInit {

  constructor(private korisnikServis: UserService, private ruter: Router) { }

  ngOnInit(): void {
  }

  korisnickoIme: string = "";
  lozinka: string = "";
  poruka: string = "";

  prijavaNaSistem() {
    if (this.korisnickoIme == "" || this.lozinka == "") {
      this.poruka = 'Niste uneli podatke!';
      alert(this.poruka);
      return;
    }
    this.korisnikServis.prijavaNaSistem(this.korisnickoIme, this.lozinka).subscribe((korisnik: Korisnik) => {
      if (!korisnik) {
        this.poruka = 'Neispravni kredencijali!';
        alert(this.poruka);
        return;
      }
      else {
        if (korisnik.tip == "ucesnik" || korisnik.tip == "organizator") {
          this.poruka = 'Pogrešan tip!';
          alert(this.poruka);
          return;
        }
        localStorage.setItem('ulogovan', JSON.stringify(korisnik));
        this.ruter.navigate(['administrator']);
      }
    })
  }

}
