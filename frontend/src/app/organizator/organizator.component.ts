import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Radionica } from 'src/models/radionica';
import { UserService } from 'src/services/user.service';
import { WorkshopService } from 'src/services/workshop.service';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private korisnikServis: UserService, private radionicaServis: WorkshopService, private ruter: Router) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"));
    this.radionicaServis.dohvatiSveRadioniceZaOrganizatora().subscribe((radionice: Radionica[]) => {
      this.radionice = radionice;
      this.radionice.forEach((rad) => {
        if (rad.organizator == this.ulogovan.korisnickoIme) {
          this.mojeRadionice.push(rad);
        }
        else {
          this.ostaleRadionice.push(rad);
        }
      })
    })
  }

  ulogovan: Korisnik;
  radionice: Radionica[] = [];
  mojeRadionice: Radionica[] = [];
  ostaleRadionice: Radionica[] = [];

  convertToDate(numOfMs) {
    return new Date(numOfMs);
  }

  sacuvajRadionicu(radionica) {
    localStorage.setItem("radionicaPrikazOrg", JSON.stringify(radionica));
    this.ruter.navigate(['radionicaPrikazOrg']);
  }

}
