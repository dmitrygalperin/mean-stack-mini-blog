import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private username: String;
  private password: String;
  private email: String;

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.checkRegistrationOpen().subscribe(data => {
      console.log(data);
      if(!data.success) {
        this.router.navigate(['']);
      }
    })
  }

  onRegisterSubmit() {
    const user = {
      username: this.username,
      password: this.password,
      email: this.email
    }

    if(!this.validateService.validateRegister(user)) {
      return this.flashMessage.show(
        'Please fill in all fields!',
        {cssClass: 'alert-danger',
        timeout: 5000});
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show(
          'You are now registered!',
          {cssClass: 'alert-success',
          timeout: 5000});
        this.router.navigate(['login']);
      } else {
        this.flashMessage.show(
          data.msg,
          {cssClass: 'alert-danger',
          timeout: 5000});
      }
    });
  }

}
