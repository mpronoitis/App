import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Store } from '@ngxs/store';
import { EdiSegmentService } from '@play.app/services/Edi/EdiSegment.service';
import { EdiVariableService } from '@play.app/services/Edi/EdiVariable.service';
import { EdiSegment } from '@play.app/types/Edi/EdiSegment';
import { EdiVariable } from '@play.app/types/Edi/EdiVariable';
import {
  faArrowLeft,
  faCheck,
  faSave,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { EdiProfile } from '@play.app/types/Edi/EdiProfile';
import { EdiProfileService } from '@play.app/services/Edi/EdiProfile.service';
import { EdiModel } from '@play.app/types/Edi/EdiModel';
import {
  CreateEdiProfile,
  GetEdiModels,
  UpdateEdiProfile,
} from '../../../../@store/Actions/edi.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'play-app-edi-profile-editor',
  templateUrl: './edi-profile-editor.component.html',
  styleUrls: ['./edi-profile-editor.component.css'],
})
export class EdiProfileEditorComponent implements OnInit {
  loading = false;
  faSave = faSave;
  faTimes = faTimes;
  faCheck = faCheck;
  faArrowLeft = faArrowLeft;
  message_text = '';
  ediPayload = ''; //edi profile paylaod that we want to show
  ediProfile: EdiProfile | null = null;
  editMode = false; //indicates if we are in edit mode
  ediModels: EdiModel[] = []; //to be used when creating edi profile (user will have to choose edi model)
  show_model_select = false;
  selectedModel: EdiModel | null = null;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '60vh',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',

    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName',
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
      ],
    ],
  };

  segments: EdiSegment[] | null = null;
  variables: EdiVariable[] | null = null;

  constructor(
    private SegmentsService: EdiSegmentService,
    private store: Store,
    private VariablesService: EdiVariableService,
    private ediProfileService: EdiProfileService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    const id = this.route.snapshot.paramMap.get('id'); // id of edi profile
    if (id) {
      //if we pass id with router we want to show current edi profile
      this.editMode = true;
      this.editProfile(id);
    } else {
      //if we don't pass id we want to create new edi profile
      this.editMode = false;
      //get edi models
      this.loading = true;
      this.store
        .dispatch(new GetEdiModels({ page: 1, pageSize: 1000 }))
        .subscribe({
          next: (data) => {
            this.ediModels = data.edi.ediModels;
          },
          error: (err) => {
            console.log(err);
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
            this.show_model_select = true;
          },
        });
    }
  }

  ngOnInit(): void {
    try {
      this.loading = true;

      //get segments
      this.SegmentsService.getAllEdiSegments(1, 1000).subscribe({
        next: (data) => {
          this.segments = data;
          //get variables
          this.VariablesService.getAllEdiVariables(1, 1000).subscribe({
            next: (data) => {
              this.variables = data;
              this.loading = false;
            },
            error: (err) => {
              if (err.status == 400) {
                this.loading = false;
                this.toastr.error("Can't get variables");
              } else {
                throw err;
              }
            },
          });
        },
        error: (err) => {
          if (err.status == 400) {
            this.loading = false;
            this.toastr.error("Can't get segments");
          } else {
            throw err;
          }
        },
      });
    } catch (error) {
      this.loading = false;
      this.toastr.error();
    }
  }

  editProfile(id: string) {
    //function to get edi profile by id
    try {
      this.ediProfileService.getEdiProfile(id).subscribe({
        next: (data: EdiProfile) => {
          this.ediProfile = data;
          this.ediPayload = data.payload;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } catch (error) {
      this.toastr.error();
    }
  }

  drop(event: CdkDragDrop<EdiVariable[]>) {
    this.ediPayload +=
      event.previousContainer.data[event.previousIndex].placeholder;
  }

  /**
   * @summary Function to save edi profile
   */
  saveEdiProfile() {
    //if ediProfile is null we want to create new edi profile
    if (this.ediProfile == null) {
      //we need to create new edi profile
      this.ediProfile = {
        id: '00000000-0000-0000-0000-000000000000', //we set a blank guid , the api will generate a new one
        title: Date.now().toString(),
        payload: this.ediPayload,
        model_Id:
          this.selectedModel?.id || 'B0D8FD93-CB5B-4DEE-9E1B-78E8F31E4429',
        enabled: true,
        customer_Id: this.store.selectSnapshot((state) => state.auth.id),
      };
    }

    //strip html tags from payload
    this.ediProfile.payload = this.ediPayload.replace(/(<([^>]+)>)/gi, '');

    //if we are not in edit mode we want to create new edi profile
    if (!this.editMode) {
      this.store.dispatch(new CreateEdiProfile(this.ediProfile)).subscribe({
        next: () => {
          this.toastr.success('Edi profile created successfully');
        },
        error: (err) => {
          if (err.status == 400) {
            this.toastr.error();

            console.log(err);
          } else {
            throw err;
          }
        },
      });
    } else {
      //if we are in edit mode we want to update edi profile
      this.store.dispatch(new UpdateEdiProfile(this.ediProfile)).subscribe({
        next: () => {
          this.toastr.success('Profile updated successfully');
        },
        error: (err) => {
          if (err.status == 400) {
            this.toastr.error();
            console.log(err);
          } else {
            throw err;
          }
        },
      });
    }
  }

  /**
   * @summary Function to add item loop segments
   */
  addLoopSegment(type: string) {
    //if type is start we want to add start loop segment
    if (type == 'start') {
      this.ediPayload += '<div>$ITEMS_LOOP_START$</div>';
    }
    //if type is end we want to add end loop segment
    if (type == 'end') {
      this.ediPayload += '<div>$ITEMS_LOOP_END$</div>';
    }
  }
}
