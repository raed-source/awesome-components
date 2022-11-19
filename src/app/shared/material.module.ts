import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{MatToolbarModule} from '@angular/material/toolbar'
import{ MatCardModule} from '@angular/material/card';
import{MatListModule} from '@angular/material/list';
import{MatButtonModule} from '@angular/material/button';
import{MatIconModule} from '@angular/material/icon';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule}from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
<<<<<<< HEAD
// import{MatProgressSpinnerModule} from'@angular/material/progress-spinner;
=======
import{MatProgressSpinnerModule} from'@angular/material/progress-spinner';

>>>>>>> ce816209bdf599dc7ae0ac4ec32c56108afb9e48
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
<<<<<<< HEAD
    // MatProgressSpinnerModule
=======
    MatProgressSpinnerModule
>>>>>>> ce816209bdf599dc7ae0ac4ec32c56108afb9e48
  ]
})
export class MaterialModule { }
