import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';
import { Company } from '../company';


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

  newCompany(company, first, last, email, password) {
  let data = new FormData ();
  data.append('company', company);
  data.append('first', first);
  data.append('last', last);
  data.append('email', email);
  data.append('password', password);
  console.log(data);
  this.userService.createUser(data)
    .subscribe((data) => console.log(data)) ;
}


}
