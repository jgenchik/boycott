import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'boycott';

  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {

    // check for updates
    // swUpdate.available.subscribe(evt => {
    swUpdate.versionUpdates.subscribe(evt => {
      const snack = this.snackbar.open('Update Available', 'Reload', {
        // duration: 6000
      });

      snack
        .onAction()   
        .subscribe(() => {
          window.location.reload();
        });

    });

  }


}
