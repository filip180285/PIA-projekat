import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-pregled-profila',
  templateUrl: './pregled-profila.component.html',
  styleUrls: ['./pregled-profila.component.css']
})
export class PregledProfilaComponent implements OnInit {

  constructor(private korisnikServis: UserService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem("korisnikProfil"));
  }

  korisnik: Korisnik;

  ukloniKorisnika() {
    this.korisnikServis.ukloniKorisnika(this.korisnik.korisnickoIme).subscribe((resp) => {
      alert(resp["message"]);
      localStorage.removeItem("korisnikProfil");
      this.ruter.navigate(['administrator']);
    });
  }

}
