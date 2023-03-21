import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Radionica } from 'src/models/radionica';
import { UserService } from 'src/services/user.service';
import { WorkshopService } from 'src/services/workshop.service';

@Component({
  selector: 'app-admin-radionice',
  templateUrl: './admin-radionice.component.html',
  styleUrls: ['./admin-radionice.component.css']
})
export class AdminRadioniceComponent implements OnInit {

  constructor(private korisnikServis: UserService, private radionicaServis: WorkshopService, private ruter: Router) { }

  ngOnInit(): void {
    this.radionicaServis.dohvatiAktivneRadionice().subscribe((radionice: Radionica[]) => {
      this.aktivneRadionice = radionice;
    });

    this.radionicaServis.dohvatiRadioniceNaCekanju().subscribe((radionice: Radionica[]) => {
      this.cekajuRadionice = radionice;
    });
  }

  aktivneRadionice: Radionica[] = [];
  cekajuRadionice: Radionica[] = [];


  sacuvajRadionicu(radionica) {
    localStorage.setItem("radionicaPrikazAdmin", JSON.stringify(radionica));
    this.ruter.navigate(['radionicaPrikazAdmin']);
  }

  sacuvajPredlog(radionica) {
    localStorage.setItem("predlogPrikaz", JSON.stringify(radionica));
    this.ruter.navigate(['predlogPrikaz']);
  }

  convertToDate(numOfMs) {
    return new Date(numOfMs);
  }
}
