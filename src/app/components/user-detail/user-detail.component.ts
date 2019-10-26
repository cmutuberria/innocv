import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Crumbs } from 'src/app/models/crumbs';
import { MatSnackBar } from '@angular/material/snack-bar'
import { PreloadService } from 'src/app/services/preload.service';
import * as  moment from 'moment';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
  user:User
  breadcrumbs: Crumbs[]=[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private preloadService: PreloadService,
    public translate: TranslateService,
    private userService: UserService) { 
      this.user = new User();
    }

  ngOnInit() {
    this.loadUser();
  }
  async loadUser() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.preloadService.fireLoading();
      this.userService.getOne(id)
        .subscribe(res => {  
          this.preloadService.stopLoading();
          this.user=res;
          this.breadcrumbs = [{ name: "Users", url: "user" }, { name: this.user ? this.user.name :"Unknown", url: "" }]
        }, error => {
            this.preloadService.addError(error)
        });
    }

  }
  create() {
    this.router.navigate(['user/form']);
  }

  edit() {
    this.router.navigate(['user/form/' + this.user.id]);
  }

  delete() {
    this.preloadService.fireLoading();
    this.userService.delete(this.user.id)
      .subscribe(res => {
        this.translate.get('user.user-deleted').subscribe((msg: string) => {
          this._snackBar.open(msg, "ok", {
            duration: 5000,
          });
        });
        this.preloadService.stopLoading();
        this.router.navigate(['user']);
      }, error => {
          this.preloadService.addError(error)
      });
  }

  dateFormat(date, format) {
    return moment(date).format(format)
  }
}
