import * as AppState from '@main/app.state';
import { createReducer, on } from '@ngrx/store';
import { 
  AllMapTilerActionTypes,
  MapTilerAction 
} from './maptiler.actions';
export interface State extends AppState.State {
  maptiler: MapTilerState;
}

export interface MapTilerState {
  forwardGeocodeObj: any;
  geolocationObj: any;
  coordinatesObj: any;
  error: any;
  success: boolean,
  succesMsg: '',
  loading: boolean;
}

const initialState: MapTilerState = {
  forwardGeocodeObj: {},
  geolocationObj: {},
  coordinatesObj: {},
  success: false,
  succesMsg: '',
  error: null,
  loading: false,
};

export const MapTilerReducer = (
  state: MapTilerState = initialState,
  action: MapTilerAction,
  ): MapTilerState => {
    switch (action.type){

      // get maptilerObj options
      case AllMapTilerActionTypes.FORWARD_GEOCODE:
      return { ...state, success: false, error: null };

      case AllMapTilerActionTypes.FORWARD_GEOCODE_SUCCESS:
      return { ...state,  forwardGeocodeObj: action.payload, success: true };
      
      case AllMapTilerActionTypes.FORWARD_GEOCODE_FAIL:
      return { ...state, success: false, error: action.payload };

      // get geolocation info
      case AllMapTilerActionTypes.GEOLOCATION_INFO:
      return { ...state, success: false, error: null };

      case AllMapTilerActionTypes.GEOLOCATION_INFO_SUCCESS:
      return { ...state,  geolocationObj: action.payload, success: true };
      
      case AllMapTilerActionTypes.GEOLOCATION_INFO_FAIL:
      return { ...state, success: false, error: action.payload };

      // get coordinates
      case AllMapTilerActionTypes.SEARCH_COORDINATES:
      return { ...state, success: false, error: null };

      case AllMapTilerActionTypes.SEARCH_COORDINATES_SUCCESS:
      return { ...state,  coordinatesObj: action.payload, success: true };
      
      case AllMapTilerActionTypes.SEARCH_COORDINATES_FAIL:
      return { ...state, success: false, error: action.payload };
    }
  }