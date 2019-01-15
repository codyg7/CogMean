import CogMean from '../models/CogMean';
import {Observable} from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

//RxJS operator for mapping the observable
import { map } from 'rxjs/operators';

@Injectable()
export class CogmeanService {

  api_url = 'http://localhost:3000';
  cogmeanUrl = `${this.api_url}/api/cogmeans`;

  constructor(
    private http: HttpClient
  ) { }


  //Create cogmean, takes a CogMean Object
  createCogmean(cogmean: CogMean): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.cogmeanUrl}`, cogmean);
  }

  //Read cogmean, takes no arguments
  getCogMeans(): Observable<CogMean[]>{
    return this.http.get(this.cogmeanUrl)
    .pipe(map(res  => {
      //Maps the response object sent from the server
        
      return res["data"].docs as CogMean[];
    }))
  }
  //Update cogmean, takes a CogMean Object as parameter
  editCogmean(cogmean:CogMean){
    let editUrl = `${this.cogmeanUrl}`
    //returns the observable of http put request 
    return this.http.put(editUrl, cogmean);
  }

  deleteCogmean(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.cogmeanUrl}/${id}`
    return this.http.delete(deleteUrl)
    .pipe(map(res  => {
      return res;
    }))
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}