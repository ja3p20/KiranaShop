import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KiranaShopFormService {

  private countriesUrl = `http://localhost:8080/api/countries`;
  private statesUrl = `http://localhost:8080/api/states`;

  constructor(private httpClient: HttpClient) {}



  getCreditCardMonths(startDate: number): Observable<number[]>{ //return an observable array
    let data: number[] = [];
    for (let theMonth=startDate; theMonth <=12; theMonth++){
      data.push(theMonth);
    }

    //console.log("......"+data);
    //console.log("-----"+of(data));

    return of(data); // "of" operator from rxjs will wrap an object as an Observable
  }

  getCreditCardYears(): Observable<number[]>{

    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for( let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }

    return of(data);
  }


  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    )
  }

  getStates(theCountryCode: string): Observable<State[]>{
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    )
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates{
  _embedded: {
    states: State[];
  }
}
