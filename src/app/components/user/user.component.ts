import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import * as  moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Crumbs } from 'src/app/models/crumbs';
import { PreloadService } from 'src/app/services/preload.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'birthdate', 'actions'];
  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  breadcrumbs:Crumbs[] = [{ name: "Users", url: "" }];

  constructor(private router: Router, 
    public translate: TranslateService,
    private userService: UserService,
    private preloadService:PreloadService,
    private _snackBar: MatSnackBar) {
   }

  ngOnInit() {
    const paginatorIntl = new MatPaginatorIntl();
    this.translate.get(['paginator.items-per-page',
      'paginator.next-page', 'paginator.previous-page',
      'paginator.first-page','paginator.last-page']
    ).subscribe((msg: string) => {
      paginatorIntl.itemsPerPageLabel = msg['paginator.items-per-page']
      paginatorIntl.nextPageLabel = msg['paginator.next-page']
      paginatorIntl.previousPageLabel = msg['paginator.previous-page']
      paginatorIntl.firstPageLabel = msg['paginator.first-page']
      paginatorIntl.lastPageLabel = msg['paginator.last-page']
    });
    
    this.paginator._intl=paginatorIntl;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.listAll();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listAll() {
    this.preloadService.fireLoading();
    this.userService.listAll()
      .subscribe(res => {
        this.dataSource.data=res;
        this.preloadService.stopLoading();
      }, error => {
        this.preloadService.addError(error)
      }
      );
  } 

  create(){
    this.router.navigate(['user/form']);
  }

  detail(user:User){
    this.router.navigate(['user/' + user.id]);
  }
  edit(user:User){
    this.router.navigate(['user/form/'+user.id]);
  }
  delete(user:User){
    this.userService.delete(user.id)
      .subscribe(res => {
        this.listAll();
        this.translate.get('user.user-deleted').subscribe((msg: string) => {
          this._snackBar.open(msg, "ok", {
            duration: 5000,
          });
        });
        
      }, error => {
          this.preloadService.addError(error)
      });
  }

  dateFormat(date,format){
    return moment(date).format(format)
  }

}
