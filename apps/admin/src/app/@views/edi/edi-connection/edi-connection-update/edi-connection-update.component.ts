import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { EdiConnection } from '@play.app/types/Edi/EdiConnection';
import { UpdateEdiConnection } from 'apps/admin/src/app/@store/Actions/edi.actions';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
@Component({
  selector: 'play-app-admin-edi-connection-update',
  templateUrl: './edi-connection-update.component.html',
  styleUrls: ['./edi-connection-update.component.scss'],
})
export class EdiConnectionUpdateComponent implements OnInit, OnDestroy {
  faSync = faSync;
  showForm = false;
  loading = false;

  subscription: Subscription | undefined; //to destroy subscription after request
  //Controlls of foreign keys to display
  customerControl = new FormControl('');
  profileControl = new FormControl('');
  modelControl = new FormControl('');
  organizationControl = new FormControl('');
  ediConnectionControl = new FormControl('');

  //Filtering to available options when user clicks to autocomplete
  customerFilteredOptions: Observable<string[]> | undefined;
  ediprofileFilteredOptions: Observable<string[]> | undefined;
  modelFilteredOptions: Observable<string[]> | undefined;
  organizationFilteredOptions: Observable<string[]> | undefined;
  ediConnectionsFilteredOptions: Observable<string[]> | undefined;

  //Form to update connection
  updateForm = new FormGroup({
    ftp_Hostname: new FormControl('', [Validators.required]),
    ftp_Username: new FormControl('', [Validators.required]),
    ftp_Password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    ftp_Port: new FormControl<number | null>(0, [Validators.required]),
    file_Type: new FormControl('', [Validators.required]),
  });

  @Input() ediConnectionsOptions: string[] = [];
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

    this.ediConnectionsFilteredOptions =
      this.ediConnectionControl.valueChanges.pipe(
        //filtering to options base what we are typing
        //every type we typing checking for possible options
        startWith(''),
        map((value) => this.ediConnectionFilter(value || ''))
      );
  }

  private ediConnectionFilter(value: string): any {
    //filter base on what we searching
    const filterValue = value.toLowerCase();
    return this.ediConnectionsOptions.filter((option) =>
      option.includes(filterValue)
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
    //filter base on what we searching
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

  getEdiConnection(ediConnectionControl: FormControl) {
    //function to get edi connection when searching
    if (this.ediConnectionControl.value === '') {
      this.toastr.error();
      return;
    }

    //if we choose a a connection we want to display it to form
    const ediConnection = this.store
      .selectSnapshot((state) => state.edi.ediConnections)
      .find(
        (connection: any) =>
          connection.ftp_Username === ediConnectionControl.value
      );

    if (ediConnection) {
      //patch update form with values
      this.updateForm.patchValue({
        ftp_Hostname: ediConnection.ftp_Hostname,
        ftp_Username: ediConnection.ftp_Username,
        ftp_Password: ediConnection.ftp_Password,
        ftp_Port: ediConnection.ftp_Port,
        file_Type: ediConnection.file_Type,
      });
    }

    //find customer_Name

    const customer_Name = this.store
      .selectSnapshot((state) => state.users.users)
      .find((user: any) => user.id === ediConnection.customer_Id).username;

    //find ediProfile_Name
    const ediProfileName = this.store
      .selectSnapshot((state) => state.edi.ediProfiles)
      .find((profile: any) => profile.id === ediConnection.profile_Id).title;

    //find model_Name
    const modelName = this.store
      .selectSnapshot((state) => state.edi.ediModels)
      .find((model: any) => model.id === ediConnection.model_Id).title;

    //find organization_Name
    const orgName = this.store
      .selectSnapshot((state) => state.edi.ediOrganizations)
      .find((org: any) => org.id === ediConnection.org_Id).name;

    this.customerControl.patchValue(customer_Name);
    this.profileControl.patchValue(ediProfileName);
    this.modelControl.patchValue(modelName);
    this.organizationControl.patchValue(orgName);

    this.showForm = true; //display update form when values are loaded
  }

  updateConnection(
    customerControl: FormControl,
    profileControl: FormControl,
    modelControl: FormControl,
    organizationControl: FormControl
  ) {
    try {
      this.loading = true;

      //check if all fields are filled
      if (
        this.updateForm.invalid ||
        this.customerControl.value === '' ||
        this.profileControl.value === '' ||
        this.modelControl.value === '' ||
        this.organizationControl.value === ''
      ) {
        this.toastr.error();
        this.loading = false;
        return;
      }
      if (this.ediConnectionControl.value === '') {
        this.toastr.error();
        this.loading = false;
        return;
      }

      //if are filled we want to get the id of the customer, profile, model and organization

      const idConnection = this.store
        .selectSnapshot((state) => state.edi.ediConnections)
        .find(
          (connection: any) =>
            connection.ftp_Username === this.ediConnectionControl.value
        ).id;
      const modelId = this.store
        .selectSnapshot((state) => state.edi.ediModels)
        .find((model: any) => model.title === modelControl.value).id;
      const org_Id = this.store
        .selectSnapshot((state) => state.edi.ediOrganizations)
        .find((org: any) => org.name === organizationControl.value).id;
      const profile_Id = this.store
        .selectSnapshot((state) => state.edi.ediProfiles)
        .find((profile: any) => profile.title === profileControl.value).id;
      const customerId = this.store
        .selectSnapshot((state) => state.users.users)
        .find((user: any) => user.username === customerControl.value).id;
      const ediConnection: EdiConnection = {
        id: idConnection,
        customer_Id: customerId,
        profile_Id: profile_Id,
        model_Id: modelId,
        org_Id: org_Id,
        ftp_Hostname: this.updateForm.value.ftp_Hostname || '',
        ftp_Username: this.updateForm.value.ftp_Username || '',
        ftp_Password: this.updateForm.value.ftp_Password || '',
        //ftp_port as int
        ftp_Port: this.updateForm.value.ftp_Port || 0,
        file_Type: this.updateForm.value.file_Type || '',
      };

      this.subscription = this.store
        .dispatch(new UpdateEdiConnection({ ediConnection: ediConnection }))
        .subscribe({
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
            this.toastr.success('Edi Connection updated successfully');
            this.updateForm.reset();
            this.customerControl.patchValue('');
            this.profileControl.patchValue('');
            this.modelControl.patchValue('');
            this.organizationControl.patchValue('');
            this.ediConnectionControl.patchValue('');
            this.refreshData();
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
