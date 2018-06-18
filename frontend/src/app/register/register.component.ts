import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  model: object = {};
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
  }

  newCompany() {
  console.log(this.model)
  this.userService.createUser(this.model)
    .subscribe(
      response => console.log(response),
      err => console.log(err)
    ) ;
}


}
