import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  categories:any;
  constructor(private _categoryService:CategoryService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this._categoryService.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },(error)=>{
        Swal.fire('Error !!','Error while loading categories','error');
      }
    );
  }
}
