import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:'',
  };
  constructor(private snack:MatSnackBar, private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit()
  {
    if(this.loginData.username.trim()=='' ||this.loginData.username==null){
      this.snack.open('Username is required','',{duration:3000});
      return
    }else if(this.loginData.password.trim()=='' ||this.loginData.password==null){
      this.snack.open('Password is required','',{duration:3000});
      return
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        //login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);


            //checking admin or user
            if(this.login.getUserRole()=="ADMIN"){
              //redirect ...Admin dashboard
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
              //window.location.href='/admin';
            }else if(this.login.getUserRole()=="NORMAL"){
              this.login.loginStatusSubject.next(true);
              //redirect ...normal dashboard
              this.router.navigate(['user-dashboard/0']);
              
            }else{
              this.login.logout();
            }
          });
      },
      (error:any)=>{
        console.log('error');
        console.log(error);
        this.snack.open('Invalid details!!!','',{duration:3000});
      }
    );

  }

}
