import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Radionica } from 'src/models/radionica';
import { UserService } from 'src/services/user.service';
import { WorkshopService } from 'src/services/workshop.service';
import * as Leaflet from 'leaflet';

Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
  selector: 'app-predlog-prikaz',
  templateUrl: './predlog-prikaz.component.html',
  styleUrls: ['./predlog-prikaz.component.css']
})
export class PredlogPrikazComponent implements OnInit {

  constructor(private korisnikServis: UserService, private radionicaServis: WorkshopService, private ruter: Router) { }

  mapa!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 18,
    center: { lat: 44.78513185479577, lng: 20.465277532492415 }
  }

  ngOnInit(): void {
    this.predlog = JSON.parse(localStorage.getItem("predlogPrikaz"));
    this.korisnikServis.dohvatiKorisnika(this.predlog.organizator).subscribe((data: Korisnik) => {
      this.korisnik = data;
      if (this.korisnik.tip == "ucesnik") { // za ucesnika provjeravamo da li ima aktivnih prijava
        this.radionicaServis.dohvatiSveRadionicePrijavio(this.predlog.organizator).subscribe((radionice: number[]) => {
          this.prijaveRadionicaId = radionice;
          //console.log("prijavljeni")
          //console.log(this.prijaveRadionicaId);
        });
      }
    });

    this.radionicaServis.search(this.predlog.adresa).subscribe((res) => {
      if (res.length > 0) {
        //alert("usaoo")
        this.options.center.lat = res[0].lat;
        this.options.center.lng = res[0].lon;
        console.log(res)
        console.log(res[0].lat)
        console.log(res[0].lon)
        let map = Leaflet.map('map', this.options);

        let layer = new Leaflet.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        map.addLayer(layer);

        let marker = new Leaflet.Marker([this.options.center.lat, this.options.center.lng]);
        marker.addTo(map);
      }
      else {
        let map = Leaflet.map('map', this.options);

        let layer = new Leaflet.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        map.addLayer(layer);

        let marker = new Leaflet.Marker([this.options.center.lat, this.options.center.lng]);
        marker.addTo(map);
      }
    })
  }

  predlog: Radionica;
  korisnik: Korisnik;
  prijaveRadionicaId: number[] = [];

  convertToDate(numOfMs) {
    return new Date(numOfMs);
  }

  odobriPredlog() {
    if (this.korisnik.tip == "ucesnik" && this.prijaveRadionicaId.length > 0) {
      alert("Učesnik ima prijave za aktuelne radionice!")
      return;
    }
    this.radionicaServis.odobriPredlog(this.predlog.id).subscribe((res) => {
      alert(res["message"]);
      if (this.korisnik.tip == "ucesnik") {
        this.korisnikServis.promovisiUcesnikaUOrganizatora(this.korisnik.korisnickoIme).subscribe((res) => {
          alert(res["message"]);
        });
      }
      this.ruter.navigate(['administrator']);
    });
  }

  odbijPredlog() {
    let slike = this.predlog.slike;
    slike.push(this.predlog.glavnaSlika);
    this.radionicaServis.odbijPredlog(this.predlog.id, slike).subscribe((res) => {
      alert(res["message"]);
      this.ruter.navigate(['administrator']);
    })
  }

}
