import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  userEmail: string = "Value written from the typescript";
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitForm() {
    console.log(this.userEmail);
  }


}
