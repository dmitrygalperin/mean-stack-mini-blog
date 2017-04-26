import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  username: String;
  title: String;
  body: String;
  url: String;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService
  ) { }

  ngOnInit() {
  }

  onAddPostSubmit() {
    var post = {
      title: this.title,
      body: this.body,
      author: null,
      comments: [],
      url: null
    }

    if(!this.validateService.validatePost(post)) {
      return this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 5000})
    }

    const id = JSON.parse(localStorage.getItem('user')).id;
    const user = {
      id: id
    }

    this.authService.verifyUserId(user).subscribe(data => {
      if(data.success) {
        this.generatePostUrl();

        post.author = data.user.username,
        post.url = this.url

        this.postService.addPost(post).subscribe(data => {
          if(data.success) {
            this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
            this.router.navigate(['']);
          } else {
            this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
          }
        });
      }
    });
  }

  generatePostUrl() {
    this.url = this.title.slice(0,40).toLowerCase().replace(/ /g, '-');
  }
}
