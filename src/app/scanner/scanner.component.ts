import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import Quagga from '@ericblade/quagga2';
import { BarcodeFormat } from '@zxing/library';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { tap } from 'rxjs/operators';

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

  constructor(private httpClient: HttpClient) {
    
  }

  ngOnInit(): void {

    // Quagga.init({
    //   inputStream: {
    //     constraints: {
    //       facingMode: 'environment' // restrict camera type
    //     },
    //     area: { // defines rectangle of the detection
    //       top: '40%',    // top offset
    //       right: '0%',  // right offset
    //       left: '0%',   // left offset
    //       bottom: '40%'  // bottom offset
    //     },
    //   },
    //   decoder: {
    //     readers: ['ean_reader'] // restrict code types
    //   },
    // },
    // (err) => {
    //   if (err) {
    //     this.errorMessage = `QuaggaJS could not be initialized, err: ${err}`;
    //   } else {
    //     Quagga.start();
    //     Quagga.onDetected((res) => {
    //       window.alert(`code: ${res.codeResult.code}`);
    //     })
    //   }
    // });

  }

  ngAfterViewInit() {
    // this.barcodeScanner!.start();
  }

  // onValueChanges(result: any) {
  //   this.barcodeValue = result.codeResult.code;
  // }

  // onStarted(started: any) {
  //   console.log(started);
  // }

  onScanSuccess(upc: string) {
    console.log('scanned', event);

    const options = {
      params: {upc: upc}
    };

    this.httpClient.get(`http://localhost:7000/upcitemdb`, options).pipe(
      tap(val => console.log(val)),
      tap(val => this.barcodeValue = val)
    ).subscribe();
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


}
