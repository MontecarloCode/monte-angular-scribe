import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-suggested',
  templateUrl: './suggested.component.html',
  styleUrls: ['./suggested.component.css']
})
export class SuggestedComponent implements OnInit {

  users: any;
  currentuser: any;

  constructor(
    private userService: UserService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(user => {
      if (user) {
        this.currentuser = user.uid;
      } else {
        this.currentuser = null;
      }
    });
    this.userService.getSuggestedUsers().subscribe(userlist => {
      this.users = userlist;
    });
  }

  checkCurrent(uid: any) {
    if (this.currentuser && this.currentuser === uid) {
      return false;
    } else {
      return true;
    }
  }

}
