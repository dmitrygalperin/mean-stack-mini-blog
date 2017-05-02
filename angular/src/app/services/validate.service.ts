import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if(user.username == undefined || user.password == undefined || user.email == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validatePost(post) {
    if(post.title == undefined || post.body == undefined) {
      return false;
    } else {
      return true;
    }
  }

}
