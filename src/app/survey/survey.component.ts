import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient,HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  })
};  

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  surveyForm;
  config: any;
  restURL = "http://34.74.117.226:8080/forms"
  

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { 
    this.surveyForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      phoneNumber: '',
      email: '',
      dateOfSurvey: '',
      mostLiked: new FormArray([]),
      interest: '',
      recommend: ''
    });  
  }

  ngOnInit(): void {
  }

  onCheckChange(event: any){
    const formArray: FormArray = this.surveyForm.get('mostLiked') as FormArray;
    if(event.target.checked){
      formArray.push(new FormControl(event.target.value));
    }
    else{
      let i: number = 0;
      formArray.controls.forEach((ctrl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
    console.log(formArray);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  onSubmit(surveyData: any) {
    
    // this.http.get(this.restURL)
    // .subscribe(data => console.log('success', JSON.stringify(data)),
    // error => console.log('oops', error));
    // //console.log(this.config);

    this.http.post(this.restURL, JSON.stringify(surveyData), httpOptions).subscribe(data => console.log('success', JSON.stringify(data)),
     error => console.log('oops', error));
    console.log(surveyData);
  }

}
