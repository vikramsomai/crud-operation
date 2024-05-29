import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from '../../model/post.model';
import { UserModel } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = `https://jsonplaceholder.typicode.com/posts`
  constructor(private http: HttpClient) { }

  getPostData(): Observable<any> {
    return this.http.get(`${this.url}`)
  }
  setPostData(post: PostModel): Observable<any> {
    return this.http.post(`${this.url}`, post)
  }
  updatePostData(id: number, post: PostModel) {
    return this.http.put(`${this.url}/${id}`, post)
  }
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
  }
}
