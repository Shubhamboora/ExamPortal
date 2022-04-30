import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category:any={
    title:"",
    description:""
  }
  constructor(private snack:MatSnackBar, private service:CategoryService) { }

  ngOnInit(): void {
  }

  public submit(){

    if(this.category.title.trim()=='' || this.category.title.trim()==null){
      this.snack.open('Title fild is empty', '',{duration:3000});
      return;
    }
    else if(this.category.description.trim()=='' || this.category.description.trim()==null){
      this.snack.open('Description fild is empty', '',{duration:3000});
      return;
    }
    else{
      this.service.addCategory(this.category).subscribe(
        (data:any)=>{
          this.category.title='';
          this.category.description='';
          Swal.fire('Success !!', 'Category added successfuly', 'success');
        },
        (error:any)=>{
          this.category.description='';
          Swal.fire('Error !!', 'Server Error', 'error');
        }
      );
    }
  }

}
