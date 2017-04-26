import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Object;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postService.getRecentPosts().subscribe(res => {
      this.posts = res.posts;
    }, err => {
      console.log(err);
      return false;
    });
  }

}
