import { Injectable } from '@angular/core';
import { State } from '@ngrx/store';
import { 
  Observable, 
  of, 
  Subscription 
} from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  takeUntil,
  switchMap,
} from 'rxjs/operators';
import { 
  Actions, 
  ofType, 
  createEffect 
} from '@ngrx/effects';
import { 
  AllMapTilerActionTypes,
  MapTilerAction 
} from './maptiler.actions';
import { MapTilerService } from './maptiler.service';

@Injectable()
export class MapTilerEffects {

  constructor(
    private maptilerService: MapTilerService,
    private actions$: Actions,
  ) { }


  public forwardGeocodeEffect$ = createEffect(() =>
     this.actions$.pipe(
       // set type
       ofType(AllMapTilerActionTypes.FORWARD_GEOCODE),
       // switch to a new observable and cancel previous subscription
       switchMap((data: any) => {
         return this.maptilerService.forwardGeocode(data?.payload)
           .pipe(
             // return payload
             map((result: any) => {
               return {
                 type: AllMapTilerActionTypes.FORWARD_GEOCODE_SUCCESS,
                 payload: result
               };
             }),
             catchError((error: any) =>
               // error handler
               of({
                 type: AllMapTilerActionTypes.FORWARD_GEOCODE_FAIL,
                 payload: error
               }),
             ),
           );
       }),
     ),
   )
  
  public geolocationInfoEffect$ = createEffect(() =>
     this.actions$.pipe(
       // set type
       ofType(AllMapTilerActionTypes.GEOLOCATION_INFO),
       // switch to a new observable and cancel previous subscription
       switchMap((data: any) => {
         return this.maptilerService.geolocationInfo()
           .pipe(
             // return payload
             map((result: any) => {
               return {
                 type: AllMapTilerActionTypes.GEOLOCATION_INFO_SUCCESS,
                 payload: result
               };
             }),
             catchError((error: any) =>
               // error handler
               of({
                 type: AllMapTilerActionTypes.GEOLOCATION_INFO_FAIL,
                 payload: error
               }),
             ),
           );
       }),
     ),
   );

  public searchCoordinateEffect$ = createEffect(() =>
     this.actions$.pipe(
       // set type
       ofType(AllMapTilerActionTypes.SEARCH_COORDINATES),
       // switch to a new observable and cancel previous subscription
       switchMap((data: any) => {
         return this.maptilerService.searchCoordinates(data?.payload)
           .pipe(
             // return payload
             map((result: any) => {
               return {
                 type: AllMapTilerActionTypes.SEARCH_COORDINATES_SUCCESS,
                 payload: result
               };
             }),
             catchError((error: any) =>
               // error handler
               of({
                 type: AllMapTilerActionTypes.SEARCH_COORDINATES_FAIL,
                 payload: error
               }),
             ),
           );
       }),
     ),
   )
}
