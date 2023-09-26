import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MapTilerRoutes } from './maptiler.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from '../../shared/components/material-components/material-components.module';
import { MaptilerComponent } from './maptiler.component'
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { MapTilerEffects } from './state/maptiler.effects';
import { MapTilerReducer } from './state/maptiler.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMapLibreGLModule,
    MaterialComponentsModule,
    StoreModule.forFeature('maptiler', MapTilerReducer),
    EffectsModule.forFeature([MapTilerEffects]),
    RouterModule.forChild(MapTilerRoutes)
  ],
  declarations: [
  	MaptilerComponent
  ]
})
export class MapTilerModule{ }
