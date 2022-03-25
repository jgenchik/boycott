import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ScannerComponent } from './scanner/scanner.component';

import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";
import { ZXingScannerModule } from '@zxing/ngx-scanner';


const routes: Routes = [
  {path: 'scan', component: ScannerComponent},
  { path: '',   redirectTo: '/scan', pathMatch: 'full' },
  { path: '**', component: ScannerComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    ScannerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(routes, {useHash: true, enableTracing: false}),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BarcodeScannerLivestreamModule,
    ZXingScannerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
