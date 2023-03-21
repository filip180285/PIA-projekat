import { Component, OnInit } from '@angular/core';
import { Radionica } from 'src/models/radionica';
import { WorkshopService } from 'src/services/workshop.service';

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.css']
})
export class Top5Component implements OnInit {

  convertToDate(numOfMs) {
    return new Date(numOfMs);
  }

  constructor(private radionicaServis: WorkshopService) { }

  ngOnInit(): void {
    // sada vraca aktivne i zavrsene
    this.radionicaServis.dohvatiSveRadionice().subscribe((radionice: Radionica[]) => {
      this.radionice = radionice;
      this.sortirajRadionice();
      this.top5 = this.radionice.splice(0, 5)
    });
  }

  sortirajRadionice() {
    this.radionice.sort((a, b) => {
      return b.svidjanja.length - a.svidjanja.length;
    });
  }

  radionice: Radionica[] = [];
  top5: Radionica[] = [];

}
