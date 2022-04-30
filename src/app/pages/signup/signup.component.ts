import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private snackbar: MatSnackBar, private userservice:UserService) { }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  }
  flag:boolean=false;

  ngOnInit(): void {  }

  formSubmit() {
    if(this.user.username=='' || this.user.username=='null'){
      this.snackbar.open('Please fill all required fields', '', {
        duration: 5000,
        verticalPosition:'bottom',
        direction:'ltr'
      });
      return
    }
    this.flag=true;
    this.userservice.addUser(this.user).subscribe(
      (data:any)=>{
        this.flag = false;
        //success
        Swal.fire('Done', data.username+' registered Successfully!!', 'success')
      },
      (error)=>{
        this.flag = false;
        //error
        this.snackbar.open('Oops... Something went wrong.', '', {
          duration: 3000
        });
      }
    )

  }

}
