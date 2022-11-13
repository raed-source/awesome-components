import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsComponent } from './components/comments/comments.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';
import { UsernamePipe } from './pipes/username.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/hightlight.directive';

@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipe,
    UsernamePipe,
    TimeAgoPipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    MaterialModule,
    CommentsComponent,
    ShortenPipe,
    UsernamePipe,
    TimeAgoPipe,
    HighlightDirective,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
