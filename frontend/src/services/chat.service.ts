import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  uri = 'http://localhost:4000/chats';

  constructor(private http: HttpClient) { }

  dohvatiSveCetoveUcesnika(korisnik1) {
    const data = {
      korisnik1: korisnik1
    }
    return this.http.post(`${this.uri}/getAllChatsForParticipant`, data);
  }

  dohvatiSveCetoveOrganizatora(korisnik2, radionicaId) {
    const data = {
      korisnik2: korisnik2,
      radionicaId: radionicaId
    }
    return this.http.post(`${this.uri}/getAllChatsForOrganiser`, data);
  }

  dohvatiCetUcesnika(korisnik1, korisnik2, radionicaId) {
    const data = {
      korisnik1: korisnik1,
      korisnik2: korisnik2,
      radionicaId: radionicaId
    }
    return this.http.post(`${this.uri}/getChatForParticipant`, data);
  }

  posaljiPoruku(data) {
    return this.http.post(`${this.uri}/sendMessage`, data);
  }

  kreirajChat(data) {
    return this.http.post(`${this.uri}/createChat`, data);
  }

}