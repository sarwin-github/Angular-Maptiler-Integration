import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
// Import the whole library
import * as maptilerClient from '@maptiler/client';
import { HttpClient } from '@angular/common/http';
// Or import only the bits you need
import {
  config,
  geocoding,
  geolocation,
  coordinates,
  data,
  staticMaps,
} from '@maptiler/client';
import { Observable, of, BehaviorSubject, from  } from "rxjs";
import { map, filter, switchMap, catchError, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MapTilerService {
  constructor(private http: HttpClient) {
    config.apiKey = environment.map_tiler;
  }

  // generate static map
  public generateStaticMap(){
    return from(maptilerClient.staticMaps.centered(
      // center position (Boston)
        [-71.06080, 42.362114],

        // zoom level
        12.5,

        // Options
        {
          // Request a hiDPI/Retina image
          hiDPI: true,
          format: 'png',
          // Output image size
          width: 500,
          height: 500,

          // Map style
          style: 'streets',
        }
     ))
    .pipe(
      reduce((result: string, char: string) => result + char, ''),
      map((res: any) => res),
      catchError(this.errorHandler)
    );
  }


  // forward geocode function
  public forwardGeocode(query: string): Observable<any> {
    return from(maptilerClient.geocoding.forward(query))
    .pipe(
      map((res: any) => res),
      catchError(this.errorHandler)
    );
  }

  // https://api.maptiler.com/maps/basic-v2-light/static/-73.98,40.766999,16/825x350.png?markers=icon%3Ahttps%3A%2F%2Ftinyurl.com%2Fyakrjl3t%7Canchor%3Acenter%7C-73.981137%2C40.767397&key=7ogPXcNb2mU4rCk89TgW

  public searchCoordinates(query: string): Observable<any>{
    return from(maptilerClient.coordinates.search(query))
    .pipe(
      map((res: any) => res),
      catchError(this.errorHandler)
    ); 
  }

  // get geolocation info
  public geolocationInfo(): Observable<any> {
    // using client js
    /*return from(maptilerClient.geolocation.info())
    .pipe(
      map((res: any) => res),
      catchError(this.errorHandler)
    );*/

    // this will result with CORS error - should include permission
    return this.http.get(`https://api.maptiler.com/geolocation/ip.json?key=${environment.map_tiler}`)
    .pipe(
      map((res: any) => res),  
      catchError(this.errorHandler)
    )
  }


  // error handler authorize
  private errorHandler(error: any, caught: any): any {
    localStorage.setItem('notFound', 'true');
    throw error;
  }
}


