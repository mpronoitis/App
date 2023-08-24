import { Component } from '@angular/core';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { TwentyDomainSearch } from '@play.app/types/20i/TwentyDomainSearch';
import { SearchDomains } from '../../../@store/Actions/twenty.actions';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './twenty-domain-search-dialog.component.html',
  styles: [],
})
export class TwentyDomainSearchDialogComponent {
  loading = false;
  faSearchPlus = faSearchPlus;
  domainResult: TwentyDomainSearch[] | undefined = undefined;
  //flag indicating if domain we are searching for has tld
  hasTld = false;

  //form group
  form = new FormGroup({
    domain: new FormControl(''),
    availableTlds: new FormControl(''),
    availability: new FormControl(''),
  });

  constructor(private store: Store) {}

  /**
   * @summary Function to search for a domain
   * @param domainName
   */
  searchDomain(domainName: string): void {
    //check if domain has tld
    this.hasTld = domainName.includes('.');
    this.loading = true;
    this.store.dispatch(new SearchDomains({ query: domainName })).subscribe({
      next: (result) => {
        this.domainResult = result.twenty.domainSearch;
        console.log(this.domainResult);
        //convert headers array to string with newlines
        if (this.domainResult) {
          this.form.patchValue({
            availableTlds: this.hasTld
              ? 'N/A'
              : this.domainResult[0]?.header.names.join('\n') || 'N/A',
            domain: domainName,
            availability: this.hasTld
              ? this.domainResult[1].can || 'N/A'
              : 'N/A',
          });
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  /**
   * @summary Helper function to get the height of the textarea
   */
  getTextAreaHeight(): number {
    if (!this.domainResult || this.domainResult[0]?.header.names.length) {
      if (this.domainResult) {
        const value = Math.floor(
          this.domainResult[0]?.header.names.length / 50
        );
        return value * 20;
      }
    }
    return 0;
  }
}
