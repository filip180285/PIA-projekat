import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/models/korisnik';
import { Radionica } from 'src/models/radionica';
import { UserService } from 'src/services/user.service';
import { WorkshopService } from 'src/services/workshop.service';
import { Komentar } from "src/models/komentar";
import * as Leaflet from 'leaflet';

Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
  selector: 'app-radionica-ucestvovao-prikaz',
  templateUrl: './radionica-ucestvovao-prikaz.component.html',
  styleUrls: ['./radionica-ucestvovao-prikaz.component.css']
})
export class RadionicaUcestvovaoPrikazComponent implements OnInit {

  constructor(private korisnikServis: UserService, private radionicaServis: WorkshopService) { }

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
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"));
    this.radionica = JSON.parse(localStorage.getItem("radionicaUcestvovaoPrikaz"));

    this.korisnikServis.dohvatiSveKorisnike().subscribe((korisnici: Korisnik[]) => {
      this.korisnici = korisnici;
      this.korisnici.forEach((korisnik) => this.map.set(korisnik.korisnickoIme, korisnik));
    })

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

  map: Map<String, Korisnik> = new Map();
  ulogovan: Korisnik;
  radionica: Radionica;
  korisnici: Korisnik[] = [];

  noviKomentar: string = "";

  convertToDate(numOfMs) {
    return new Date(numOfMs);
  }


  azurirajSvidjanja() {
    if (this.radionica.svidjanja.includes(this.ulogovan.korisnickoIme)) {
      let index = this.radionica.svidjanja.indexOf(this.ulogovan.korisnickoIme);
      this.radionica.svidjanja.splice(index, 1);
    }
    else {
      this.radionica.svidjanja.push(this.ulogovan.korisnickoIme);
    }
    this.radionicaServis.azurirajSvidjanja(this.radionica.id, this.radionica.svidjanja).subscribe((resp) => {
      console.log(resp["message"]);
    });
  }

  posaljiKomentar() {
    let novi = new Komentar();
    let id = 0;
    if (this.radionica.komentari.length == 0) { id = 1; }
    else {
      id = this.radionica.komentari[this.radionica.komentari.length - 1].idK + 1;
    }
    novi.idK = id;
    novi.korisnik = this.ulogovan.korisnickoIme;
    novi.vreme = Date.now();
    novi.tekst = this.noviKomentar;
    this.radionica.komentari.push(novi);
    this.radionicaServis.azurirajKomentare(this.radionica.id, this.radionica.komentari).subscribe((resp) => {
      //console.log(resp["message"]);
      //alert(resp["message"]);
      this.noviKomentar = "";
    });
  }


}
