import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Injectable()
export class PostResolver implements Resolve<Post[]> {
  constructor(private postService:PostService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]>{
    return this.postService.getPosts();
  }
}
