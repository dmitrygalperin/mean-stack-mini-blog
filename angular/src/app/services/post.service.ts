import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';

@Injectable()
export class PostService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getRecentPosts() {
    return this.http.get('http://localhost:3000/posts/recent')
      .map(res => res.json());
  }

  getPostByUrl(url) {
    return this.http.get(`http://localhost:3000/posts/${url}`)
      .map(res => res.json())
  }

  addPost(post) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);
    return this.http.post('http://localhost:3000/posts/new', post, {headers})
      .map(res => res.json());
  }

}
