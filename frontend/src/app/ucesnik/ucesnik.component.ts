import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/models/chat';
import { Korisnik } from 'src/models/korisnik';
import { Radionica } from 'src/models/radionica';
import { ChatService } from 'src/services/chat.service';
import { UserService } from 'src/services/user.service';
import { WorkshopService } from 'src/services/workshop.service';

@Component({
  selector: 'app-ucesnik',
  templateUrl: './ucesnik.component.html',
  styleUrls: ['./ucesnik.component.css']
})
export class UcesnikComponent implements OnInit {

  constructor(private korisnikServis: UserService, private radionicaServis: WorkshopService,
    private chatService: ChatService, private ruter: Router) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"));
    this.korisnikServis.dohvatiKorisnika(this.ulogovan.korisnickoIme).subscribe((data: Korisnik) => {
      this.ulogovan = data;
      localStorage.setItem('ulogovan', JSON.stringify(this.ulogovan));

      this.radionicaServis.dohvatiSveRadioniceUcestvovao(this.ulogovan.radionice).subscribe((radionice: Radionica[]) => {
        this.radioniceUcestvovao = radionice;
        this.pozoviSort();
      });

      this.chatService.dohvatiSveCetoveUcesnika(this.ulogovan.korisnickoIme).subscribe((cetovi: Chat[]) => {
        this.chats = cetovi;

        this.chats.forEach((cet) => {
          this.korisnikServis.dohvatiKorisnika(cet.korisnik2).subscribe((korisnik: Korisnik) => {
            cet.korisnik2Objekat = korisnik;
          })
        })
        //alert(this.chats[0].poruke[0].tekst)
      });


      // vratice sve radionice bez obzira na status, ali msm da je ok
      // jer lajk/koment otkazane radionice ne mijenja nista, jer u top5
      // prikazujemo samo aktivne i zavrsene
      this.radionicaServis.dohvatiSveRadioniceLajkovao(this.ulogovan.korisnickoIme).subscribe((radionice: Radionica[]) => {
        this.radioniceLajkovao = radionice;
        this.radionicaServis.dohvatiSveRadioniceKomentarisao(this.ulogovan.korisnickoIme).subscribe((radionice: Number[]) => {
          this.radioniceKomentarisao = radionice;
          this.radioniceLajkovao.forEach((radionica) => {
            if (!this.radioniceKomentarisao.includes(radionica.id)) {
              this.radioniceKomentarisao.push(radionica.id);
            }
          });
          //alert(this.radioniceKomentarisao)
          this.radionicaServis.dohvatiSveRadioniceID(this.radioniceKomentarisao).subscribe((radionice: Radionica[]) => {
            this.radionice = radionice;
          });
        });
      });

    });
  }

  ulogovan: Korisnik;
  radioniceUcestvovao: Radionica[] = [];

  radioniceLajkovao: Radionica[] = [];
  radioniceKomentarisao: Number[] = [];
  radionice: Radionica[] = []; // lajk/koment

  chats: Chat[] = [];

  toggleChat(chat) {
    chat.show = !chat.show;
  }

  toggleWorkshop(workshop) {
    workshop.show = !workshop.show;
  }

  convertToDate(numOfMs) {
    return new Date(numOfMs);
  }

  tip: string = "naziv";
  kako: string = "rastuce";

  pozoviSort() {
    if (this.tip == "datum") this.sortiranjePoDatumu();
    else if (this.tip == "naziv") this.sortiranjePoNazivu();
    else this.sortiranjePoMestu();
  }

  sortiranjePoNazivu() {
    this.radioniceUcestvovao.sort((a, b) => {
      if (a.naziv == b.naziv) {
        return 0;
      }
      if (this.kako == "rastuce") return a.naziv < b.naziv ? -1 : 1;
      else return a.naziv < b.naziv ? 1 : -1;
    });
  }

  sortiranjePoMestu() {
    this.radioniceUcestvovao.sort((a, b) => {
      if (a.mesto == b.mesto) {
        return 0;
      }
      if (this.kako == "rastuce") return a.mesto < b.mesto ? -1 : 1;
      else return a.mesto < b.mesto ? 1 : -1;
    });
  }

  sortiranjePoDatumu() {
    this.radioniceUcestvovao.sort((a, b) => {
      if (this.kako == "rastuce") return a.datum - b.datum;
      else return b.datum - a.datum;
    });
  }

  posaljiPoruku(chat) {
    let vreme = Date.now();
    const data = {
      korisnik1: chat.korisnik1,
      korisnik2: chat.korisnik2,
      radionicaId: chat.radionicaId,
      autor: chat.korisnik1,
      tekst: chat.novaPoruka,
      vreme: vreme
    };
    this.chatService.posaljiPoruku(data).subscribe((resp) => {
      chat.poruke.push({
        autor: chat.korisnik1,
        tekst: chat.novaPoruka,
        vreme: vreme
      });
      chat.novaPoruka = "";
      /*this.chatService.dohvatiSveCetoveUcesnika(this.ulogovan.korisnickoIme).subscribe((cetovi: Chat[]) => {
        this.chats = cetovi;

        this.chats.forEach((cet) => {
          this.korisnikServis.dohvatiKorisnika(cet.korisnik2).subscribe((korisnik: Korisnik) => {
            cet.korisnik2Objekat = korisnik;
          })
        })
        //alert(this.chats[0].poruke[0].tekst)
      });*/
    });
  }

  azurirajSvidjanja(radionica) {
    if (radionica.svidjanja.includes(this.ulogovan.korisnickoIme)) {
      let index = radionica.svidjanja.indexOf(this.ulogovan.korisnickoIme);
      radionica.svidjanja.splice(index, 1);
    }
    else {
      radionica.svidjanja.push(this.ulogovan.korisnickoIme);
    }
    this.radionicaServis.azurirajSvidjanja(radionica.id, radionica.svidjanja).subscribe((resp) => {
      console.log(resp["message"]);
    });
  }

  sacuvajRadionicuIKomentar(radionica, komentar) {
    localStorage.setItem("radionica", JSON.stringify(radionica));
    localStorage.setItem("komentar", JSON.stringify(komentar));
    this.ruter.navigate(['azuriranjeKomentara']);
  }

  sacuvajRadionicu(radionica) {
    localStorage.setItem("radionicaUcestvovaoPrikaz", JSON.stringify(radionica));
    //this.ruter.navigate(['pregledZahtevaReg']);
  }
}
