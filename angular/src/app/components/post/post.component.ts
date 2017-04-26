import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  url: String;
  post: Object;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.url = params['url'];

      this.postService.getPostByUrl(this.url).subscribe(data => {
        this.post = data.post;
      });
    });
  }

}
