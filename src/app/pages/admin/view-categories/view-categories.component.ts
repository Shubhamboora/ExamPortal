import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  _categories:any=null;
  constructor(private data:CategoryService) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.data.categories().subscribe(
      (data:any)=>{
        this._categories = data;
      },
      (error:any)=>{
        console.log(error);
        Swal.fire("Error !!","Error in loading data","error");
      });
  }
}
