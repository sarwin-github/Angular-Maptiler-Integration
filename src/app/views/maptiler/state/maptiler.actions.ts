import { Action } from '@ngrx/store';
import {
  createAction,
  props
} from "@ngrx/store";

export const enum AllMapTilerActionTypes {
  FORWARD_GEOCODE = '[MapTiler] - Forward Geocode for MapTiler',
  FORWARD_GEOCODE_SUCCESS = '[MapTiler] - Forward Geocode for MapTiler Success',
  FORWARD_GEOCODE_FAIL = '[MapTiler] - Forward Geocode for MapTiler Fail',

  GEOLOCATION_INFO = '[MapTiler] - Get Geolocation Info MapTiler',
  GEOLOCATION_INFO_SUCCESS = '[MapTiler] - Get Geolocation Info Success',
  GEOLOCATION_INFO_FAIL = '[MapTiler] - Get Geolocation Info Fail',

  SEARCH_COORDINATES = '[MapTiler] - Search Coordinates MapTiler',
  SEARCH_COORDINATES_SUCCESS = '[MapTiler] - Search Coordinates Success',
  SEARCH_COORDINATES_FAIL = '[MapTiler] - Search Coordinates Fail',
  
}

/* GET FORWARD GEOCODE ACTIONS */
export class GeocodeQuery implements Action {
  public readonly type = AllMapTilerActionTypes.FORWARD_GEOCODE;
  constructor(public payload: any) { }
}

export class GeocodeQuerySuccess implements Action {
  public readonly type = AllMapTilerActionTypes.FORWARD_GEOCODE_SUCCESS;
  constructor(public payload: any) { }
}

export class GeocodeQueryFail implements Action {
  public readonly type = AllMapTilerActionTypes.FORWARD_GEOCODE_FAIL;
  constructor(public payload: any) { }
}

/* GET FORWARD GEOCODE ACTIONS */
export class GetGeoLocationInfoQuery implements Action {
  public readonly type = AllMapTilerActionTypes.GEOLOCATION_INFO;
  constructor(public payload: any) { }
}

export class GetGeoLocationInfoQuerySuccess implements Action {
  public readonly type = AllMapTilerActionTypes.GEOLOCATION_INFO_SUCCESS;
  constructor(public payload: any) { }
}

export class GetGeoLocationInfoQueryFail implements Action {
  public readonly type = AllMapTilerActionTypes.GEOLOCATION_INFO_FAIL;
  constructor(public payload: any) { }
}

/* SEARCH COORDINATES ACTIONS */
export class SearchCoordinates implements Action {
  public readonly type = AllMapTilerActionTypes.SEARCH_COORDINATES;
  constructor(public payload: any) { }
}

export class SearchCoordinatesSuccess implements Action {
  public readonly type = AllMapTilerActionTypes.SEARCH_COORDINATES_SUCCESS;
  constructor(public payload: any) { }
}

export class SearchCoordinatesFail implements Action {
  public readonly type = AllMapTilerActionTypes.SEARCH_COORDINATES_FAIL;
  constructor(public payload: any) { }
}

export type MapTilerAction =
GeocodeQuery |
GeocodeQuerySuccess |
GeocodeQueryFail |

GetGeoLocationInfoQuery |
GetGeoLocationInfoQuerySuccess |
GetGeoLocationInfoQueryFail |

SearchCoordinates |
SearchCoordinatesSuccess |
SearchCoordinatesFail;


