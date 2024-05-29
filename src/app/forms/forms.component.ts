import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-landing-page',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})

// We will see two types of forms
// 1. Template forms: are based on the HTML format
// 2. Reactive forms: allow the observables to interact with the values entered by the user
// They have a validation format which is way more profound and allows us to generate dynamic forms

export class FormsComponent implements OnInit {

  snapForm!: FormGroup;
  userEmail: string = "Value written from the typescript";
  urlRegex: any = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
  // when we do this we are, link in Spring, injecting the dependency
  // hence we do not need to instantiate anythhing
  // we can just use the formbuilder directly
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // we instatiate the form
    // you can add validators to make sure that the user enters these values
    // if not the form will be rejected
    // you can also add regex validators for the format of something (url, email)...
    this.snapForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      location: [null]
    });
  }

  onSubmitForm(form: NgForm) {
    console.log(form);
  }

  onSubmitReactiveForm() {
    console.log(this.snapForm.getRawValue());
  }


}
