import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-pregled-zahteva-reg',
  templateUrl: './pregled-zahteva-reg.component.html',
  styleUrls: ['./pregled-zahteva-reg.component.css']
})
export class PregledZahtevaRegComponent implements OnInit {

  constructor(private korisnikServis: UserService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem("zahtevReg"));
  }

  korisnik: Korisnik;

  prihvati() {
    this.korisnikServis.prihvatiZahtevZaRegistraciju(this.korisnik.korisnickoIme).subscribe((resp) => {
      alert(resp["message"]);
      localStorage.removeItem("zahtevReg");
      this.ruter.navigate(['zahteviRegistracija']);
    });
  }

  odbij() {
    this.korisnikServis.odbijZahtevZaRegistraciju(this.korisnik.korisnickoIme).subscribe((resp) => {
      alert(resp["message"]);
      localStorage.removeItem("zahtevReg");
      this.ruter.navigate(['zahteviRegistracija']);
    });
  }

}
