import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/models/chat';
import { Korisnik } from 'src/models/korisnik';
import { Radionica } from 'src/models/radionica';
import { ChatService } from 'src/services/chat.service';
import { UserService } from 'src/services/user.service';
import { WorkshopService } from 'src/services/workshop.service';

import * as Leaflet from 'leaflet';

Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
  selector: 'app-radionica-prikaz-org',
  templateUrl: './radionica-prikaz-org.component.html',
  styleUrls: ['./radionica-prikaz-org.component.css']
})
export class RadionicaPrikazOrgComponent implements OnInit {

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

  constructor(private korisnikServis: UserService, private radionicaServis: WorkshopService, private chatService: ChatService, private ruter: Router) { }

  ngOnInit(): void {
    this.radionica = JSON.parse(localStorage.getItem("radionicaPrikazOrg"));
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"));

    this.korisnikServis.dohvatiKorisnika(this.radionica.organizator).subscribe((data: Korisnik) => {
      this.organizator = data;
    });

    this.korisnikServis.dohvatiSveKorisnike().subscribe((korisnici: Korisnik[]) => {
      this.korisnici = korisnici;
      this.korisnici.forEach((korisnik) => this.map.set(korisnik.korisnickoIme, korisnik));
    })

    if (this.radionica.organizator == this.ulogovan.korisnickoIme)
      this.chatService.dohvatiSveCetoveOrganizatora(this.ulogovan.korisnickoIme, this.radionica.id).subscribe((cetovi: Chat[]) => {
        this.chats = cetovi;

        this.chats.forEach((cet) => {
          this.korisnikServis.dohvatiKorisnika(cet.korisnik1).subscribe((korisnik: Korisnik) => {
            cet.korisnik1Objekat = korisnik;
          })
        })
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

  map: Map<String, Korisnik> = new Map();
  radionica: Radionica;
  ulogovan: Korisnik;
  organizator: Korisnik;

  korisnici: Korisnik[] = [];

  chats: Chat[] = [];

  toggleChat(chat) {
    chat.show = !chat.show;
  }

  posaljiPoruku(chat) {
    let vreme = Date.now();
    const data = {
      korisnik1: chat.korisnik1,
      korisnik2: chat.korisnik2,
      radionicaId: chat.radionicaId,
      autor: chat.korisnik2,
      tekst: chat.novaPoruka,
      vreme: vreme
    };
    this.chatService.posaljiPoruku(data).subscribe((resp) => {
      chat.poruke.push({
        autor: chat.korisnik2,
        tekst: chat.novaPoruka,
        vreme: vreme
      });
      chat.novaPoruka = "";
    });
  }

  convertToDate(numOfMs) {
    return new Date(numOfMs);
  }

  sacuvajRadionicu(radionica) {
    localStorage.setItem("radionicaAzuriranje", JSON.stringify(radionica));
  }

  oznaciKrajRadionice() {
    this.radionicaServis.oznaciKrajRadionice(this.radionica.id).subscribe((res) => {
      alert(res["message"]);
      this.radionica.status = "zavrsena";
      localStorage.setItem("radionicaPrikazOrg", JSON.stringify(this.radionica))
    });
    this.radionica.prijavljeni.forEach((korisnik) => {
      this.korisnikServis.dodajRadionicuUListu(korisnik, this.radionica.id).subscribe((res) => {
        console.log(res["message"]);
      });
    });
  }

  otkaziRadionicu() {
    this.radionicaServis.otkaziRadionicu(this.radionica.id).subscribe((res) => {
      alert(res["message"]);
      this.radionica.status = "otkazana";
      localStorage.setItem("radionicaPrikazOrg", JSON.stringify(this.radionica))
    });
    this.radionica.prijavljeni.forEach((korisnik) => {
      this.korisnikServis.posaljiMejlOtkaz(this.map.get(korisnik).mejl, this.radionica.naziv).subscribe((res) => {
        console.log(res["message"]);
      });
    });
  }

  sacuvajSablonRadionice() {
    const data = {
      korisnickoIme: this.ulogovan.korisnickoIme,
      id: this.radionica.id,

      naziv: this.radionica.naziv,
      glavnaSlika: this.radionica.glavnaSlika,
      datum: this.radionica.datum,
      mesto: this.radionica.mesto,
      adresa: this.radionica.adresa,
      kratakOpis: this.radionica.kratakOpis,
      dugOpis: this.radionica.dugOpis,
      slike: JSON.stringify(this.radionica.slike)
    };
    this.radionicaServis.sacuvajSablon(data).subscribe((res) => {
      let imeSkice = "" + this.radionica.naziv + this.radionica.id + ".json";
      this.ulogovan.skice.push(imeSkice);
      localStorage.setItem("ulogovan", JSON.stringify(this.ulogovan))
      alert(res["message"]);
    });
  }

  vecSkicirana() {
    let imeSkice = "" + this.radionica.naziv + this.radionica.id + ".json";
    return this.ulogovan.skice.includes(imeSkice);
  }

  obrisiPrijavu(korisnik) {
    let index = this.radionica.prijavljeni.indexOf(korisnik);
    this.radionica.prijavljeni.splice(index, 1);

    this.radionicaServis.azurirajPrijavljene(this.radionica.id, this.radionica.prijavljeni).subscribe((resp) => {
      console.log((resp["message"]));
      //alert(resp["message"]);
      //this.ruter.navigate(['ucesnikRadionice']);
    });

    if (this.radionica.kapacitet == 0) {
      this.radionica.cekajuNa.forEach((korisnik) => {
        if (this.map.get(korisnik) != null) {
          this.korisnikServis.posaljiMejlSlobodnoMesto(this.map.get(korisnik).mejl, this.radionica.naziv).subscribe((res) => {
            console.log(res["message"]);
          });
        }
      });
    }

    this.radionicaServis.povecajKapacitet1(this.radionica.id).subscribe((resp) => {
      console.log((resp["message"]));
      this.radionica.kapacitet += 1;
    });
  }

}
