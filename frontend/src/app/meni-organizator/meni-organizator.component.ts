import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meni-organizator',
  templateUrl: './meni-organizator.component.html',
  styleUrls: ['./meni-organizator.component.css']
})
export class MeniOrganizatorComponent implements OnInit {

  constructor(private ruter: Router) { }

  ngOnInit(): void {
  }

  odjaviSe() {
    localStorage.clear();
    this.ruter.navigate(['']);
  }

}
