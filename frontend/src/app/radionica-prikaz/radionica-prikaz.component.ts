import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/models/chat';
import { Komentar } from 'src/models/komentar';
import { Korisnik } from 'src/models/korisnik';
import { Radionica } from 'src/models/radionica';
import { ChatService } from 'src/services/chat.service';
import { UserService } from 'src/services/user.service';
import { WorkshopService } from 'src/services/workshop.service';

import * as Leaflet from 'leaflet';

Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
  selector: 'app-radionica-prikaz',
  templateUrl: './radionica-prikaz.component.html',
  styleUrls: ['./radionica-prikaz.component.css']
})
export class RadionicaPrikazComponent implements OnInit {

  constructor(private korisnikServis: UserService, private radionicaServis: WorkshopService, private chatService: ChatService, private ruter: Router) { }

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
    this.radionica = JSON.parse(localStorage.getItem("radionicaPrikaz"));

    this.chatService.dohvatiCetUcesnika(this.ulogovan.korisnickoIme, this.radionica.organizator, this.radionica.id).subscribe((chat: Chat) => {
      this.chat = chat;
      if (this.chat != null) {
        this.korisnikServis.dohvatiKorisnika(this.chat.korisnik2).subscribe((korisnik: Korisnik) => {
          this.chat.korisnik2Objekat = korisnik;
        })
      }
    });

    this.radionicaServis.dohvatiSveRadionice().subscribe((radionice: Radionica[]) => {
      this.sveRadionice = radionice;
      this.sveRadionice.forEach((rad) => this.mapRad.set(rad.id, rad));
      this.ulogovan.radionice.forEach((rId) => {
        if (this.mapRad.get(rId).naziv == this.radionica.naziv) {
          this.ranijeUcestvovao = true;
        }
      })
      //alert(this.ranijeUcestvovao)
    });

    this.korisnikServis.dohvatiSveKorisnike().subscribe((korisnici: Korisnik[]) => {
      this.korisnici = korisnici;
      this.korisnici.forEach((korisnik) => this.map.set(korisnik.korisnickoIme, korisnik));
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
  mapRad: Map<number, Radionica> = new Map();
  ulogovan: Korisnik;
  radionica: Radionica;
  korisnici: Korisnik[] = [];

  sveRadionice: Radionica[] = []; // radi imena(akt + zav)
  ranijeUcestvovao = false;

  chat: Chat;
  novaPoruka: "";
  noviKomentar: string = "";

  convertToDate(numOfMs) {
    return new Date(numOfMs);
  }

  prijava() {
    this.radionicaServis.prijavaZaRadionicu(this.radionica.id, this.ulogovan.korisnickoIme).subscribe((resp) => {
      this.radionica.prijavljeni.push(this.ulogovan.korisnickoIme);
      this.radionica.kapacitet -= 1;
      localStorage.setItem('radionicaPrikaz', JSON.stringify(this.radionica));
      alert(resp["message"]);
    });

    if (this.radionica.cekajuNa.includes(this.ulogovan.korisnickoIme)) {
      this.radionica.cekajuNa.splice(this.radionica.cekajuNa.indexOf(this.ulogovan.korisnickoIme), 1);
      this.radionicaServis.azurirajCekajuNa(this.radionica.id, this.radionica.cekajuNa).subscribe((resp) => {
        localStorage.setItem('radionicaPrikaz', JSON.stringify(this.radionica));
        console.log(resp["message"]);
      });
    }
  }

  cekanje() {
    this.radionicaServis.cekanjeNaRadionicu(this.radionica.id, this.ulogovan.korisnickoIme).subscribe((resp) => {
      this.radionica.cekajuNa.push(this.ulogovan.korisnickoIme);
      localStorage.setItem('radionicaPrikaz', JSON.stringify(this.radionica));
      alert(resp["message"]);
    });
  }

  posaljiPoruku() {
    let vreme = Date.now();

    if (this.chat != null) {
      const data = {
        korisnik1: this.chat.korisnik1,
        korisnik2: this.chat.korisnik2,
        radionicaId: this.chat.radionicaId,
        autor: this.chat.korisnik1,
        tekst: this.novaPoruka,
        vreme: vreme
      };
      this.chatService.posaljiPoruku(data).subscribe((resp) => {
        this.chat.poruke.push({
          autor: this.chat.korisnik1,
          tekst: this.novaPoruka,
          vreme: vreme
        });
        this.novaPoruka = "";
      });
    }
    else {
      let newChat = {
        korisnik1: this.ulogovan.korisnickoIme,
        korisnik2: this.radionica.organizator,
        radionicaId: this.radionica.id,
        radionicaNaziv: this.radionica.naziv,
        poruke: [
          {
            autor: this.ulogovan.korisnickoIme,
            tekst: this.novaPoruka,
            vreme: vreme
          }
        ]
      }
      this.novaPoruka = "";
      const noviChat = {
        chat: JSON.stringify(newChat)
      };
      this.chatService.kreirajChat(noviChat).subscribe((resp) => {
        //alert(resp["message"]);
        this.chatService.dohvatiCetUcesnika(this.ulogovan.korisnickoIme, this.radionica.organizator, this.radionica.id).subscribe((chat: Chat) => {
          this.chat = chat;
          if (this.chat != null) {
            this.korisnikServis.dohvatiKorisnika(this.chat.korisnik2).subscribe((korisnik: Korisnik) => {
              this.chat.korisnik2Objekat = korisnik;
            })
          }
        });
      })
    }
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

}
