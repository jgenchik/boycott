import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'boycott';

  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {

    // check for updates
    swUpdate.versionUpdates.pipe(
      tap(val => {
        console.log('in swUpdate.versionUpdates. Type: ', typeof val, 'VersionEvent: ', val);
      }),
      filter(versionEvent => versionEvent.type === 'VERSION_READY')
    )
    .subscribe(evt => {

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
