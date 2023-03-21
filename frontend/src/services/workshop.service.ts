import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {
  uri = 'http://localhost:4000/workshops';

  constructor(private http: HttpClient) { }

  search(address: string): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
    return this.http.get(url);
  }

  dohvatiAktivneRadionice() {
    return this.http.get(`${this.uri}/getAllActiveWorkshops`);
  }

  dohvatiRadioniceNaCekanju() {
    return this.http.get(`${this.uri}/getAllWaitingWorkshops`);
  }

  // dohvata aktivne i zavrsene
  dohvatiSveRadionice() {
    return this.http.get(`${this.uri}/getAllWorkshops`);
  }

  // dohvati sve, posle filtrira
  dohvatiSveRadioniceZaOrganizatora() {
    return this.http.get(`${this.uri}/getAllWorkshopsForOrganiser`);
  }

  // bas sve radi novog id kada dodajemo radionicu
  dohvatiSveRadioniceAbs() {
    return this.http.get(`${this.uri}/getAllWorkshopsAbs`);
  }

  dohvatiSveRadioniceUcestvovao(radionice) {
    const data = {
      ids: JSON.stringify(radionice)
    }
    return this.http.post(`${this.uri}/getAllAttendedWorkshopsForUser`, data);
  }

  dohvatiSveRadioniceLajkovao(korisnickoIme) {
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/getAllWorkshopsLikedByUser`, data);
  }

  dohvatiSveRadioniceKomentarisao(korisnickoIme) {
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/getAllWorkshopsCommentedByUser`, data);
  }

  dohvatiSveRadioniceID(radionice) { // lajkovao/komentarisao
    const data = {
      nizId: JSON.stringify(radionice)
    }
    return this.http.post(`${this.uri}/getAllWorkshopsById`, data);
  }

  azurirajSvidjanja(id, svidjanja) {
    const data = {
      id: id,
      svidjanja: JSON.stringify(svidjanja)
    }
    return this.http.post(`${this.uri}/updateWorkshopLikes`, data);
  }

  azurirajKomentare(id, komentari) {
    const data = {
      id: id,
      komentari: JSON.stringify(komentari)
    }
    return this.http.post(`${this.uri}/updateWorkshopComments`, data);
  }

  dohvatiSveRadionicePrijavio(korisnickoIme) {
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/getAllWorkshopsAppliedByUser`, data);
  }

  azurirajPrijavljene(id, prijavljeni) {
    const data = {
      id: id,
      prijavljeni: JSON.stringify(prijavljeni)
    }
    return this.http.post(`${this.uri}/updateWorkshopApplies`, data);
  }

  povecajKapacitet1(id) {
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/incCapByOne`, data);
  }

  azurirajCekajuNa(id, cekajuNa) {
    const data = {
      id: id,
      cekajuNa: JSON.stringify(cekajuNa)
    }
    return this.http.post(`${this.uri}/updateWorkshopWaitingList`, data);
  }

  prijavaZaRadionicu(id, korisnickoIme) {
    const data = {
      id: id,
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/addUserToApplies`, data);
  }

  cekanjeNaRadionicu(id, korisnickoIme) {
    const data = {
      id: id,
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/addUserToWaitingList`, data);
  }

  /** */
  posaljiSliku(formData) {
    return this.http.post(`${this.uri}/addMainImage`, formData);
  }

  posaljiSlike(formData) {
    return this.http.post(`${this.uri}/addGallery`, formData);
  }

  dodajPredlogRadionice(data) {
    return this.http.post(`${this.uri}/addNewWorkshopSuggestion`, data);
  }

  dodajPoSkici(data) {
    return this.http.post(`${this.uri}/addBySketch`, data);
  }

  dodajRadionicuAdmin(data) {
    return this.http.post(`${this.uri}/addNewWorkshopAdmin`, data);
  }

  odobriPredlog(id) {
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/acceptWorkshopSuggestion`, data);
  }

  odbijPredlog(id, slike) {
    const data = {
      id: id,
      slike: JSON.stringify(slike)
    }
    return this.http.post(`${this.uri}/rejectWorkshopSuggestion`, data);
  }

  obrisiRadionicu(id, slike) {
    const data = {
      id: id,
      slike: JSON.stringify(slike)
    }
    return this.http.post(`${this.uri}/deleteWorkshop`, data);
  }

  azurirajRadionicu(data) {
    return this.http.post(`${this.uri}/updateWorkshop`, data);
  }

  oznaciKrajRadionice(id) {
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/endWorkshop`, data);
  }

  otkaziRadionicu(id) {
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/cancelWorkshop`, data);
  }

  sacuvajSablon(data) {
    return this.http.post(`${this.uri}/saveWorkshopAsJSON`, data);
  }

  dohvatiSablone(skice) {
    const data = {
      skice: JSON.stringify(skice)
    }
    return this.http.post(`${this.uri}/getSketchesForOrganiser`, data);
  }

  dohvatiFajl(imeSlike) {
    const data = {
      imeSlike: "radionica3.png"
    }
   // http://localhost:4000/workshops/getWorkshopImage/?image={{radionica.glavnaSlika}}
    return this.http.post(`${this.uri}/getFile`, data);
  }
}
