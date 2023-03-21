import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = 'http://localhost:4000/users';

  constructor(private http: HttpClient) { }

  prijavaNaSistem(korisnickoIme, lozinka) {
    const data = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka
    }
    return this.http.post(`${this.uri}/login`, data);
  }

  dohvatiKorisnika(korisnickoIme) {
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/getUser`, data);
  }

  dohvatiSveKorisnike() {
    return this.http.get(`${this.uri}/getAllUsers`);
  }

  dohvatiSveKorisnikePoImenu(nizImena) {
    const data = {
      nizImena: JSON.stringify(nizImena)
    }
    return this.http.post(`${this.uri}/getAllUsersByUsername`, data);
  }

  dohvatiSveAktivneKorisnike() {
    return this.http.get(`${this.uri}/getAllActiveUsers`);
  }

  dohvatiSveAktivneOrganizatore() {
    return this.http.get(`${this.uri}/getAllActiveOrganisers`);
  }

  dohvatiSveKorisnikeNaCekanju() {
    return this.http.get(`${this.uri}/getAllWaitingUsers`);
  }

  promeniLozinku(korisnickoIme, novaLozinka) {
    const data = {
      korisnickoIme: korisnickoIme,
      novaLozinka: novaLozinka
    }
    return this.http.post(`${this.uri}/changePassword`, data);
  }

  postaviPrivremenuLozinku(mejl, privremenaLozinka, trajanje) {
    const data = {
      mejl: mejl,
      privremenaLozinka: privremenaLozinka,
      trajanje: trajanje
    }
    return this.http.post(`${this.uri}/setTemporaryPassword`, data);
  }

  posaljiSliku(formData) {
    return this.http.post(`${this.uri}/addImage`, formData);
  }

  proveriVelicinuSlike(imeSlike) {
    const data = {
      imeSlike: imeSlike
    }
    return this.http.post(`${this.uri}/checkImageSize`, data);
  }

  registracija(data) {
    return this.http.post(`${this.uri}/register`, data);
  }

  prihvatiZahtevZaRegistraciju(korisnickoIme) {
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/acceptRegistrationRequest`, data);
  }

  odbijZahtevZaRegistraciju(korisnickoIme) {
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/denyRegistrationRequest`, data);
  }

  dodajNovogKorisnika(data) {
    return this.http.post(`${this.uri}/addNewUser`, data);
  }

  promovisiUcesnikaUOrganizatora(korisnickoIme) {
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/promoteParticipantToOrganiser`, data);
  }

  dodajRadionicuUListu(korisnickoIme, radionicaId) {
    const data = {
      korisnickoIme: korisnickoIme,
      radionicaId: radionicaId
    }
    return this.http.post(`${this.uri}/addWorkshopToList`, data);
  }

  posaljiMejlOtkaz(mejl, radionica) {
    const data = {
      mejl: mejl,
      radionica: radionica
    }
    return this.http.post(`${this.uri}/sendMailWorkshopCancelled`, data);
  }

  posaljiMejlSlobodnoMesto(mejl, radionica) {
    const data = {
      mejl: mejl,
      radionica: radionica
    }
    return this.http.post(`${this.uri}/sendMailNewSpot`, data);
  }


  /**/

  ukloniKorisnika(korisnickoIme) {
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/deleteUser`, data);
  }

  azurirajKorisnika(data) {
    return this.http.post(`${this.uri}/updateUser`, data);
  }


  nekaTestMetoda(ime) {
    const data = {
      //ime: ime
    }
    return this.http.post(`${this.uri}/nekaTestMetoda`, data);
  }
}
