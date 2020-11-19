import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retry } from 'rxjs/operators';


@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
  surveyList : any;
  restURL = "http://34.74.117.226:8080/forms"

  constructor(private http: HttpClient) { }

  
  getData(){
    this.http.get(this.restURL).subscribe(data => this.surveyList=data,
      error => console.log('oops', error));
    console.log(this.surveyList);
  }
  
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  async getSurveyList(){
    //var response = await this.getData().toPromise();
    this.getData();
    await this.delay(500);
    this.surveyList = JSON.stringify(this.surveyList);
    console.log(this.surveyList);
  }
  async proceed(){
    await this.getSurveyList();
    //this.surveyList = JSON.stringify(this.surveyList);
    console.log(this.surveyList);
   }

  ngOnInit(): void {
    this.getSurveyList();
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
}
