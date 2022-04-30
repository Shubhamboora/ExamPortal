import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedin=false;
  user=null;

  constructor(public login:LoginService) {}

  ngOnInit(): void {
    this.Initialiasion();
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }

  public Initialiasion(){
    this.isLoggedin=this.login.isLoggedIn();
    this.user=this.login.getUser();

    //using loginstatusSubject from login.services to change navebar during login/logout
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedin=this.login.isLoggedIn();
      this.user=this.login.getUser();
    })

    
  }
}
