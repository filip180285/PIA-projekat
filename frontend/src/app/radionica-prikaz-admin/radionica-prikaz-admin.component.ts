import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Radionica } from 'src/models/radionica';
import { UserService } from 'src/services/user.service';
import { WorkshopService } from 'src/services/workshop.service';
import * as Leaflet from 'leaflet';

Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
  selector: 'app-radionica-prikaz-admin',
  templateUrl: './radionica-prikaz-admin.component.html',
  styleUrls: ['./radionica-prikaz-admin.component.css']
})
export class RadionicaPrikazAdminComponent implements OnInit {

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
    this.radionica = JSON.parse(localStorage.getItem("radionicaPrikazAdmin"));
    this.korisnikServis.dohvatiKorisnika(this.radionica.organizator).subscribe((data: Korisnik) => {
      this.organizator = data;
    });

    this.radionicaServis.search(this.radionica.adresa).subscribe((res) => {
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

  radionica: Radionica;
  organizator: Korisnik;

  convertToDate(numOfMs) {
    return new Date(numOfMs);
  }

  obrisiRadionicu() {
    let slike = this.radionica.slike;
    slike.push(this.radionica.glavnaSlika);
    this.radionicaServis.obrisiRadionicu(this.radionica.id, slike).subscribe((res) => {
      alert(res["message"]);
      this.ruter.navigate(['administrator']);
    })
  }

  sacuvajRadionicu(radionica) {
    localStorage.setItem("radionicaAzuriranje", JSON.stringify(radionica));
  }

}
