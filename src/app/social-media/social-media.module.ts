import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import { PostService } from './services/post.service';
import { PostResolver } from './resolvers/post.resolver';
 import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
     PostListItemComponent,
     PostListComponent
  ],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    SharedModule
  ],
  providers:[
    PostService,
    PostResolver
  ]
})
export class SocialMediaModule { }
