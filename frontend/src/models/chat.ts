import { Korisnik } from "./korisnik";
import { Poruka } from "./poruka";

export class Chat {
  korisnik1: string;
  korisnik2: string;
  radionicaId: number;
  radionicaNaziv: string;
  poruke: Array<Poruka>;

  show: boolean = false;
  korisnik1Objekat: Korisnik;
  korisnik2Objekat: Korisnik;
  novaPoruka: string = "";
}
