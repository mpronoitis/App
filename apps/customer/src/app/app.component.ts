import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngxs/store';

@Component({
  selector: 'play-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //language

  title = 'Playsystems Customer App';

  constructor(private TranService: TranslocoService, private store: Store) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('user.userProfile') !== null &&
      localStorage.getItem('user.userProfile') !== 'null'
    ) {
      this.TranService.setActiveLang(
        this.store.selectSnapshot(
          (state) => state.user.userProfile.languagePreference
        ) || 'en'
      );
    } else {
      this.TranService.setActiveLang('en');
    }
  }
}
