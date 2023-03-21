import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meni-ucesnik',
  templateUrl: './meni-ucesnik.component.html',
  styleUrls: ['./meni-ucesnik.component.css']
})
export class MeniUcesnikComponent implements OnInit {

  constructor(private ruter: Router) { }

  ngOnInit(): void {
  }

  odjaviSe() {
    localStorage.clear();
    this.ruter.navigate(['']);
  }


}
