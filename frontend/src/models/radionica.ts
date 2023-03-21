import { Komentar } from "./komentar";

export class Radionica {
  id: number;
  naziv: string;
  status: string;
  organizator: string;
  kapacitet: number;
  glavnaSlika: string;
  datum: number;
  mesto: string;
  adresa: string;
  kratakOpis: string;
  dugOpis: string;
  slike: Array<String>;
  svidjanja: Array<String>;
  cekajuNa: Array<String>;
  komentari: Array<Komentar>;
  prijavljeni: Array<String>;

  show: boolean = false;
}
