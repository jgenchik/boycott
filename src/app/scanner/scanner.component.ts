import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Quagga from '@ericblade/quagga2';
import { BarcodeFormat } from '@zxing/library';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { tap, throttleTime } from 'rxjs/operators';

import { environment  } from 'src/environments/environment';
import { CompanyStatusService } from './services/company-status.service';

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

  message = '';

  lastUpc = '';

  isGoodCompany = false;
  isBadCompany = false;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar, private statusService: CompanyStatusService) {
    
  }

  ngOnInit(): void {

    this.startScan();

  }

  ngAfterViewInit() {
    // this.barcodeScanner!.start();
  }

  onValueChanges(result: any) {
    this.message += '\nonValueChanges. Result: ', result;
    this.barcodeValue = result.codeResult.code;
  }

  onStarted(started: any) {
    console.log(started);
    this.message += '\nStarted. ';
  }

  onScanSuccess(upc: string) {
    console.log('scanned', upc);
    this.message += '\nScanSuccess. ';

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
    this.message += '\nCameraFound. ';

  }

  onScanError(event: any) {
    console.log('onScanError', event);
    this.message += '\nScanError. ';
  }

  onScanComplete(event: any) {
    console.log('onScanComplete', event);
    this.message += '\nScanComplete. ';
  }


  private startScan() {

    Quagga.init({
      inputStream: {
        constraints: {
          facingMode: 'environment', // restrict camera type
          // width: 640,
          // width: 450,
          // height: 300,
        },
        area: { // defines rectangle of the detection
          top: '0%',    // top offset
          right: '0%',  // right offset
          left: '0%',   // left offset
          bottom: '0%'  // bottom offset
        },
      },
      decoder: {
        readers: ['ean_reader'] // restrict code types
        // readers: ['code_128_reader']
      },
    },
    (err) => {
      if (err) {
        this.errorMessage = `QuaggaJS could not be initialized, err: ${err}`;
      } else {
        Quagga.start();
        Quagga.onDetected((res) => {
          // window.alert(`code: ${res.codeResult.code}`);
          // console.log('scanned. res: ', res);

          if(res.codeResult.code &&  this.lastUpc.length === 0) {
            this.lastUpc = res.codeResult.code;

            console.log('scanned. res.codeResult.code: ', res.codeResult.code);
            
            this.message += res.codeResult.code+' - '



            const options = {
              params: {upc: res.codeResult.code ?? ''}
            };
        
            this.httpClient.get(`${environment.API_DOMAIN}/upcitemdb`, options).pipe(
              tap(val => console.log(val)),
              tap(val => this.barcodeValue = val),
              tap((val: any) => {
                if(val.total == 0) {
                  this.snackBar.open(`UPC ${res.codeResult.code} not found`, undefined, {
                    duration: 2000
                  });
                  this.clearBarcodeValue();
                } else {
                  let status = this.statusService.evaluateCompany(this.barcodeValue.items[0].brand);

                  if(status) {
                    this.isGoodCompany = status.status === 'GOOD';
                    this.isBadCompany = status.status === 'BAD';
                  }
                }
              })
            ).subscribe();



            // const opt = {
            //   params: {upc: res.codeResult.code ?? ''}
            // };

            // this.httpClient.get(`${environment.API_DOMAIN}/upcitemdb`, opt).pipe(
            //   throttleTime(3000),
            //   tap(val => console.log(val)),
            //   tap(val => this.barcodeValue = val),
            //   // tap(() => Quagga.stop())
            // ).subscribe();

          }
          


          // const opt = {
          //   params: {upc: res.codeResult.code ?? ''}
          // };

          // if(this.barcodeValue?.total !> 0) {
          //   this.httpClient.get(`${environment.API_DOMAIN}/upcitemdb`, opt).pipe(
          //     throttleTime(3000),
          //     tap(val => console.log(val)),
          //     tap(val => this.barcodeValue = val),
          //     tap(() => Quagga.stop())
          //   ).subscribe();
          // }
          // this.httpClient.get(`${environment.API_DOMAIN}/upcitemdb`, opt).pipe(
          //   throttleTime(3000),
          //   tap(val => console.log(val)),
          //   tap(val => this.barcodeValue = val),
          //   // tap(() => Quagga.stop())
          // ).subscribe();
          
        })
      }
    });


    // Quagga.onDetected(barcode => {
    //   console.log(' *** in Quagga.onDetected. barcode: ', barcode);
    // });

  }

  clearBarcodeValue() {

    this.barcodeValue = null;
    // this.startScan();

    this.lastUpc = '';
    // this.message = '';

    this.isGoodCompany = false;
    this.isBadCompany = false;

  }

  loadFakeValu() {
    this.barcodeValue = {"code":"OK","total":1,"offset":0,"items":[{"ean":"0191554602151","title":"IVGEL Hand Sanitizer Gel 1000ml (33.8oz)","description":"Hand Sanitizer Gel, 33.8oz ounce with 70% ethyl alcohol.","upc":"191554602151","brand":"IVGEL","model":"Wish80z","color":"Other","size":"","dimension":"","weight":"","category":"Health & Beauty","currency":"","lowest_recorded_price":5,"highest_recorded_price":19.99,"images":["https://i5.walmartimages.com/asr/dcfe68c2-9cae-48b9-9433-114d77f1a7ac.10a5dc5993375feb8b4f135c20a6685e.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff"],"offers":[{"merchant":"Wal-Mart.com","domain":"walmart.com","title":"IVGEL Hand Sanitizer Gel 1000ml (33.8oz)","currency":"","list_price":"","price":8.84,"shipping":"5.99","condition":"New","availability":"","link":"https://www.upcitemdb.com/norob/alink/?id=z2r223w2w233a464s2&tid=1&seq=1648134136&plt=cbfb8ffb353f341431fd869a9bb0075c","updated_t":1638732938}],"elid":"264720227675"}]};
  }


}
