import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'

import {environment} from 'src/environments/environment'


@Injectable({
    providedIn:'root'
})

export class ApiService {

    constructor(private http:HttpClient) { }

    private header=new HttpHeaders({"content-type":"application/json","accept":"application/json"})
    
     //This function call HTTP get service to fetch data
    get(endpoint){
        let url=environment.baseUrl + endpoint;
        return this.http.get(url,{headers:this.header})
        .pipe(catchError(this.handleError))
    }

    download(endpoint){
        let url=environment.baseUrl + endpoint;
        return this.http.get(url,{headers:this.header,responseType:"blob"})
    }

    //This function call HTTP post service to insert data
    post(endpoint, data) {
        let url = environment.baseUrl + endpoint;
        return this.http.post(url, data, { headers: this.header })
        .pipe(catchError(this.handleError))
      }

      //This function call HTTP put service to update the data 
      put(endpoint, data) {
        let url = environment.baseUrl + endpoint;
        return this.http.put(url, data, { headers: this.header })
        .pipe(catchError(this.handleError))
      
      }

       //This function call HTTP delete service to delete the data 
      delete(endpoint) {
        let url = environment.baseUrl + endpoint;
        return this.http.delete(url, { headers: this.header })
        .pipe(catchError(this.handleError))
      }


      handleError=(errorResponse:HttpErrorResponse)=> {
          if(errorResponse.error instanceof ErrorEvent){
                console.log("Client side error as it error is instance of ErrorEvent",errorResponse.error.message)
                return throwError(errorResponse.error.message)
            }
          else{
            console.log(errorResponse.error.error || errorResponse.error || "Server side error");
            if(errorResponse.status === 401) {
                console.log("handle unauthentication error")
              }else if(errorResponse.status === 400 || errorResponse.status === 500) {
                return throwError(errorResponse.error.error || errorResponse.error || "Something went wrong");
              }else if(errorResponse.status === 404){
                return throwError(errorResponse.error.message || "Server side error");
              }
               else{
                return throwError(errorResponse);
               }   
                
            }
      }

}