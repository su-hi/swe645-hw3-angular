// Code edited by 
// Arnab Debnath
// Khadija Kobra 

import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'hw3 swe645';
  //title = 'hw3 swe645';
  flag: number | undefined;



  survey_on(){
    this.flag = 1;
  }

  survey_list_on(){
    this.flag = 2;
  }
}
