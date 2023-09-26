import { Component, OnInit } from '@angular/core';
import * as maplibregl from 'maplibre-gl'; 
import * as mapboxgl from 'mapbox-gl'; 
import { 
  select, 
  Store 
} from '@ngrx/store';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest, 
  Subject
} from 'rxjs';
import { AllMapTilerActionTypes } from './state/maptiler.actions';
import { MapTilerState } from './state/maptiler.reducer';
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";
import { environment } from '@environments/environment';
import { coordinatesList } from './model/coordinates';

@Component({
  selector: 'app-maptiler',
  templateUrl: './maptiler.component.html',
  styleUrls: ['./maptiler.component.scss']
})
export class MaptilerComponent implements OnInit {
  private maptilerData$: any;
  private req: Subscription;
  private maptilerKey: string = environment?.map_tiler;
  public mapDisplay: maplibregl.Map;
  public coordinatesList: any[] = coordinatesList;

  constructor(private maptilerStore: Store<MapTilerState>) {
    this.maptilerData$ = this.maptilerStore.pipe(select((state: any) => state?.maptiler));
  }

  ngOnInit(){
    this.generateMapview();
  }

  public generateMapview(): void{
    // forward geocode request
    //this.maptilerStore.dispatch({ type: AllMapTilerActionTypes.FORWARD_GEOCODE, payload: 'manila' });
    
    // geolocation info
    this.maptilerStore.dispatch({ type: AllMapTilerActionTypes.GEOLOCATION_INFO });

    // search map coordinates
    //this.maptilerStore.dispatch({ type: AllMapTilerActionTypes.SEARCH_COORDINATES, payload: 'Luzon 1911' });
   
    this.req = this.maptilerData$.subscribe((result) => {
      
      // get geolocation info
      if(result?.geolocationObj?.country_code){

        let style = `https://api.maptiler.com/maps/streets/style.json?key=${this.maptilerKey}`;

        this.mapDisplay = new maplibregl.Map({
          container: 'map',
          style: style,
          zoom: 13,  
          center: [-97.3345, 32.7501],// [longitude, latitude]
          maxZoom: 15
        });
        
        const gc = new GeocodingControl({apiKey: environment?.map_tiler});

        this.mapDisplay.addControl(gc);
        this.addMarkers(result?.geolocationObj);
      }
    })
  }

  // Add multiple markers
  addMarkers(geolocationMarker?: any): void{
    // Create an array to hold the markers
    const markers = [];
    const coordinates: any[] = [
      // location based on geolocation
      //{ lngLat: [longitudeMain, latitudeMain], color: 'red', text: `Geolocation Info: ${geolocationInfo?.city}. ${geolocationInfo?.country}` },
      ...this.coordinatesList
    ];   

    // loop to list of coordinates
    coordinates.forEach((el: any) => {
      const lng = parseFloat(el?.geocode?.Longitude);
      const lat = parseFloat(el?.geocode?.Latitude);
      const maxPrice = Math.max(...el?.floorplans?.map(item => item?.price));
      const minPrice = Math.min(...el?.floorplans?.map(item => item?.price));
      const marker = new maplibregl.Marker({
        color: 'red', // Specify the color
      })
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
          .setHTML(`
            <div style="text-align: center;">
              <h1 style="color: white; font-size: 14px">
                <strong>${el?.name}</strong> ($${this.formatNumberWithCommas(minPrice)} - $${this.formatNumberWithCommas(maxPrice)})
              </h1>
              <p style="color: white">${el?.streetAddress}, ${el?.city}, ${el?.state}</p>
              <p style="color: white">${el?.highValueAmenities?.length} High Value Amenities</p>
              <img src="${el?.photo}" style="object-fit: cover; height: 200px; width: 100%; margin-top: 10px">
            </div>
          `)
          .setMaxWidth("350px")
        )
        .addTo(this.mapDisplay);

      // You can also make the marker draggable if needed
      //marker.togglePopup();
      marker.setDraggable(true);

      // zoom on click function
      this.zoomOnClick(marker);

      markers.push(marker);
    });

    // Calculate the bounding box that encompasses all markers
    let bounds = new maplibregl.LngLatBounds();

    // Count markers
    markers.forEach((el, i) => bounds.extend(markers[i].getLngLat()));

    // Set the map's viewport to fit the bounding box with padding
    this.mapDisplay.fitBounds(bounds, { padding: 150 });
  }


  zoomOnClick(marker: any){
    // Add a click event listener to the marker
    marker.getElement().addEventListener('click', () => {
      // Get the marker's latitude and longitude
      const markerLngLat = marker.getLngLat();

      // Zoom in to the clicked marker's location
      this.mapDisplay.flyTo({
        center: markerLngLat,
        zoom: 15, // Adjust the zoom level as needed
      });
    });
  }

  // customer marker
  createCustomMarker(color: string): HTMLDivElement {
    const markerElement = document.createElement('div');
    markerElement.style.width = '15px';
    markerElement.style.height = '15px';
    markerElement.style.background = color;
    markerElement.style.borderRadius = '50%';

    return markerElement;
  }

  formatNumberWithCommas(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
}
