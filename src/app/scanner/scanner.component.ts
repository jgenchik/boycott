import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import Quagga from '@ericblade/quagga2';
import { BarcodeFormat } from '@zxing/library';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { tap, throttleTime } from 'rxjs/operators';

import { environment  } from 'src/environments/environment';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent | undefined;

  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX ];

  barcodeValue: any;

  errorMessage = '';

  lastUpc = '';

  constructor(private httpClient: HttpClient) {
    
  }

  ngOnInit(): void {

    // this.startScan();

  }

  ngAfterViewInit() {
    // this.barcodeScanner!.start();
  }

  onValueChanges(result: any) {
    this.barcodeValue = result.codeResult.code;
  }

  onStarted(started: any) {
    console.log(started);
  }

  onScanSuccess(upc: string) {
    console.log('scanned', upc);

    if(upc !== this.lastUpc) {

      this.lastUpc = upc;

      const options = {
        params: {upc: upc}
      };
  
      this.httpClient.get(`${environment.API_DOMAIN}/upcitemdb`, options).pipe(
        tap(val => console.log(val)),
        tap(val => this.barcodeValue = val)
      ).subscribe();

    }

    
  }

  onCameraFound(event: any) {
    console.log('onCameraFound', event);
  }

  onScanError(event: any) {
    console.log('onScanError', event);
  }

  onScanComplete(event: any) {
    console.log('onScanComplete', event);
  }


  private startScan() {

    Quagga.init({
      inputStream: {
        constraints: {
          facingMode: 'environment' // restrict camera type
        },
        area: { // defines rectangle of the detection
          top: '40%',    // top offset
          right: '0%',  // right offset
          left: '0%',   // left offset
          bottom: '40%'  // bottom offset
        },
      },
      decoder: {
        readers: ['ean_reader'] // restrict code types
      },
    },
    (err) => {
      if (err) {
        this.errorMessage = `QuaggaJS could not be initialized, err: ${err}`;
      } else {
        Quagga.start();
        Quagga.onDetected((res) => {
          // window.alert(`code: ${res.codeResult.code}`);

          const opt = {
            params: {upc: res.codeResult.code ?? ''}
          };

          // if(this.barcodeValue?.total !> 0) {
          //   this.httpClient.get(`${environment.API_DOMAIN}/upcitemdb`, opt).pipe(
          //     throttleTime(3000),
          //     tap(val => console.log(val)),
          //     tap(val => this.barcodeValue = val),
          //     tap(() => Quagga.stop())
          //   ).subscribe();
          // }
          this.httpClient.get(`${environment.API_DOMAIN}/upcitemdb`, opt).pipe(
            throttleTime(3000),
            tap(val => console.log(val)),
            tap(val => this.barcodeValue = val),
            tap(() => Quagga.stop())
          ).subscribe();
          
        })
      }
    });

  }

  clearBarcodeValue() {
    this.barcodeValue = null;
    // this.startScan();

    this.lastUpc = '';
  }


}
