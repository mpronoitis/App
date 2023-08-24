import { Component, OnDestroy, OnInit } from '@angular/core';
import { EdiSegment } from '@play.app/types/Edi/EdiSegment';
import { faAdd, faSync, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  GetEdiModels,
  GetEdiSegments,
} from '../../../../@store/Actions/edi.actions';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';

import { Router } from '@angular/router';

@Component({
  selector: 'play-app-admin-edi-segment-dashboard',
  templateUrl: './edi-segment-dashboard.component.html',
  styleUrls: ['./edi-segment-dashboard.component.scss'],
})
export class EdiSegmentDashboardComponent implements OnDestroy, OnInit {
  //Icons FontAwesome
  faAdd = faAdd;
  faTrash = faTrash;
  faSync = faSync;
  faArrowLeft = faArrowLeft;
  loading = false; //to display loading state

  ediSegments: EdiSegment[] = []; //all edi segments
  subscription: Subscription | undefined; //to manage subscription

  modelNames: string[] = []; // Names of Models Name that segments refers to
  segmentOptions: string[] = []; //Names Of Segments that we cant edit

  activeTab = '';
  showAddEdiSegmentForm = false; //to show/hide add form
  showEditEdiSegmentForm = false; //to show/hide edit form
  showDeleteEdiSegmentForm = false; //to show/hide delete form
  showForm = false; //show form when we choose a segment

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private store: Store,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getEdiSegments(1, 1000); //get all edi segments when page loads
  }

  ngOnInit(): void {
    //get all Edi Models to make reference form segment
    this.store //get all Edi Organizations to display theme to autocomplete field
      .dispatch(new GetEdiModels({ page: 1, pageSize: 1000 }))
      .subscribe({
        next: (response) => {
          this.modelNames = response.edi.ediModels.map(
            (model: any) => model.title
          );
        },
        error: (err) => {
          if (err.status === 400) {
            const badRequestResponse: BadRequestResponse = err.error;
            this.toastr.error();
          } else {
            throw err;
          }
        },
      });
  }
  getEdiSegments(page: number, pageSize: number) {
    try {
      this.loading = true; //set loading to true
      this.subscription = this.store //dispatch action to get all ediSegments
        .dispatch(new GetEdiSegments({ page: page, pageSize: pageSize }))
        .subscribe({
          next: (response) => {
            //if data load sucessfully, initialize table with data
            this.ediSegments = response.edi.ediSegments;

            this.segmentOptions = response.edi.ediSegments.map(
              (segment: any) => segment.title
            );
          },

          error: (err) => {
            //if error occurs, display error message
            if (err.status === 400) {
              const badRequestResponse: BadRequestResponse = err.error;
              this.toastr.error();
              this.loading = false;
            } else {
              throw err; //if error is not 400, throw error
            }
          },
          complete: () => {
            //if all good show toast message and set loading to false
            this.loading = false;
            this.toastr.success('Edi Segments fetched successfully');
          },
        });
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  }

  showAddForm() {
    this.showAddEdiSegmentForm = true;
    this.showDeleteEdiSegmentForm = false;
    this.showEditEdiSegmentForm = false;
    this.activeTab = 'create-segment';
  }

  showEditForm() {
    this.showAddEdiSegmentForm = false;
    this.showEditEdiSegmentForm = true;
    this.showDeleteEdiSegmentForm = false;
    this.activeTab = 'edit-segment';
  }

  showDeleteForm() {
    this.showAddEdiSegmentForm = false;
    this.showDeleteEdiSegmentForm = true;
    this.showEditEdiSegmentForm = false;
    this.activeTab = 'delete-segment';
  }

  goBack() {
    this.showForm = false;
    this.router.navigate(['/edi/segments']);
    this.showAddEdiSegmentForm = false;
    this.showDeleteEdiSegmentForm = false;
    this.showEditEdiSegmentForm = false;
    this.activeTab = '';
  }

  ngOnDestroy(): void {
    //destroy subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
