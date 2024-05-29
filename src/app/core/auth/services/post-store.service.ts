import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostModel } from '../../model/post.model';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class PostStoreService {
  isPostStore=new BehaviorSubject<PostModel[]>([])
  constructor(private post:PostService) { }
  
  setPostData(posts:PostModel[]){
      localStorage.setItem("post-data",JSON.stringify(posts))
      this.isPostStore.next(posts)
    
  }
  getPostData(){
    const data=JSON.parse(localStorage.getItem("post-data") as string)
    this.isPostStore.next(data)
    return data
  }
  
}
