import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from '@angular/core';
import { EdiConnection } from '@play.app/types/Edi/EdiConnection';
import { AddEdiConnection } from 'apps/admin/src/app/@store/Actions/edi.actions';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
@Component({
  selector: 'play-app-admin-edi-connection-add',
  templateUrl: './edi-connection-add.component.html',
  styleUrls: ['./edi-connection-add.component.scss'],
})
export class EdiConnectionAddComponent implements OnInit, OnDestroy {
  addForm = new FormGroup({
    ftp_Hostname: new FormControl<string | null>('', [Validators.required]),
    ftp_Username: new FormControl<string | null>('', [Validators.required]),
    ftp_Password: new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    ftp_Port: new FormControl<number | null>(0, [Validators.required]),
    file_Type: new FormControl<string | null>('', [Validators.required]),
  });
  //Controlls of foreign keys to display
  customerControl = new FormControl('');
  profileControl = new FormControl('');
  modelControl = new FormControl('');
  organizationControl = new FormControl('');

  //Filtering to available options when user clicks to autocomplete
  customerFilteredOptions: Observable<string[]> | undefined;
  ediprofileFilteredOptions: Observable<string[]> | undefined;
  modelFilteredOptions: Observable<string[]> | undefined;
  organizationFilteredOptions: Observable<string[]> | undefined;

  loading = false;
  faAdd = faAdd;
  subscription: Subscription | undefined; //to destroy subscription after request

  //Available options for foreign keys
  @Input() customerOptions: string[] = [];
  @Input() ediprofileOptions: string[] = [];
  @Input() modelOptions: string[] = [];
  @Input() organiationOptions: string[] = [];
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    //filtering to available options when user clicks to autocomplete
    this.customerFilteredOptions = this.customerControl.valueChanges.pipe(
      //filtering to options base what we are typing
      //every type we typing checking for possible options
      startWith(''),
      map((value) => this.customerFilter(value || ''))
    );

    this.ediprofileFilteredOptions = this.profileControl.valueChanges.pipe(
      //filtering to options base what we are typing
      //every type we typing checking for possible options
      startWith(''),
      map((value) => this.profileFilter(value || ''))
    );

    this.modelFilteredOptions = this.modelControl.valueChanges.pipe(
      //filtering to options base what we are typing
      //every type we typing checking for possible options
      startWith(''),
      map((value) => this.modelFilter(value || ''))
    );

    this.organizationFilteredOptions =
      this.organizationControl.valueChanges.pipe(
        //filtering to options base what we are typing
        //every type we typing checking for possible options
        startWith(''),
        map((value) => this.organizationFilter(value || ''))
      );
  }

  private customerFilter(value: string): any {
    //filter base on what we searching
    const filterValue = value.toLowerCase();
    return this.customerOptions.filter((option) =>
      option.includes(filterValue)
    );
  }

  private modelFilter(value: string): any {
    //filter base on what we searching
    const filterValue = value.toLowerCase();
    return this.modelOptions.filter((option) => option.includes(filterValue));
  }

  private organizationFilter(value: string): any {
    //filter base on what we are searching
    const filterValue = value.toLowerCase();
    return this.organiationOptions.filter((option) =>
      option.includes(filterValue)
    );
  }

  private profileFilter(value: string): any {
    //filter base on what we searching
    const filterValue = value.toLowerCase();
    return this.ediprofileOptions.filter((option) =>
      option.includes(filterValue)
    );
  }

  addConnection(
    customerControl: FormControl,
    profileControl: FormControl,
    modelControl: FormControl,
    organizationControl: FormControl
  ) {
    try {
      this.loading = true;
      if (
        this.addForm.invalid ||
        customerControl.value === '' ||
        profileControl.value === '' ||
        modelControl.value === '' ||
        organizationControl.value === ''
      ) {
        this.toastr.error();
        this.loading = false;
        return;
      }

      //if all ok make edi connection to add it to database
      const customer_Id = this.store
        .selectSnapshot((state) => state.users.users)
        .find((user: any) => user.username === customerControl.value).id; //find customer_Id

      const model_Id = this.store
        .selectSnapshot((state) => state.edi.ediModels)
        .find((model: any) => model.title === modelControl.value).id; //find model_Id
      const profile_Id = this.store
        .selectSnapshot((state) => state.edi.ediProfiles)
        .find((profile: any) => profile.title === profileControl.value).id; //find edi_profile
      const organization_Id = this.store
        .selectSnapshot((state) => state.edi.ediOrganizations)
        .find(
          (organization: any) => organization.name === organizationControl.value
        ).id; //find organization
      const ediConnection: EdiConnection = {
        //make object of edi connection
        id: '00000000-0000-0000-0000-000000000000',
        ftp_Hostname: this.addForm.value.ftp_Hostname || '',
        ftp_Username: this.addForm.value.ftp_Username || '',
        ftp_Password: this.addForm.value.ftp_Password || '',
        ftp_Port: this.addForm.value.ftp_Port || 0,
        file_Type: this.addForm.value.file_Type || '',
        customer_Id: customer_Id,
        model_Id: model_Id,
        profile_Id: profile_Id,
        org_Id: organization_Id,
      };
      this.subscription = this.store
        .dispatch(new AddEdiConnection({ ediConnection: ediConnection }))
        .subscribe({
          //dispatch action to add edi connection
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            if (err.status === 400) {
              const badRequestResponse: BadRequestResponse = err.error;
              this.toastr.error();
              this.loading = false;
            } else {
              throw err;
            }
          },
          complete: () => {
            this.loading = false;
            this.toastr.success('Edi Connection added successfully');
            this.addForm.reset();
            this.customerControl.patchValue('');
            this.profileControl.patchValue('');
            this.organizationControl.patchValue('');
            this.modelControl.patchValue('');
            this.refreshData(); //fetch new changes
          },
        });
    } catch (error) {
      console.log(error);
    }
  }

  refreshData() {
    this.refresh.emit();
  }

  ngOnDestroy(): void {
    //destroy subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
