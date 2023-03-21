import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';

@Component({
  selector: 'app-meni-administrator',
  templateUrl: './meni-administrator.component.html',
  styleUrls: ['./meni-administrator.component.css']
})
export class MeniAdministratorComponent implements OnInit {

  constructor(private ruter: Router) { }

  ngOnInit(): void {
  }

  odjaviSe() {
    localStorage.clear();
    this.ruter.navigate(['']);
  }
}
