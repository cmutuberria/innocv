import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Crumbs } from 'src/app/models/crumbs';
import { PreloadService } from 'src/app/services/preload.service';
import { DateAdapter} from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent implements OnInit {
  userForm:FormGroup = this.fb.group({
    id: 0,
    name: [null, Validators.required],
    birthdate: [null, Validators.required],
  });
  breadcrumbs: Crumbs[] = [{ name: "Users", url: "/user" }, { name: "User Form", url: "" }];          

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private location: Location,
    private preloadService:PreloadService,
    private _snackBar: MatSnackBar,
    public translate: TranslateService,
    private _adapter: DateAdapter<any>) { }

  ngOnInit() {
    this.loadUser();
    this._adapter.setLocale(this.translate.currentLang);
  }
  async loadUser() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.preloadService.fireLoading()
      this.userService.getOne(id)
      .subscribe(res => {
        this.userForm.setValue(res);
        this.preloadService.stopLoading();
      }, error => {
          this.preloadService.addError(error)
      });
    }

  }

  onSubmit() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      this.preloadService.fireLoading();
      if (user.id) {
        this.userService.update(user)
          .subscribe(res => {
            this.translate.get('user.user-updated').subscribe((msg: string) => {
              this._snackBar.open(msg, "ok", {
                duration: 5000,
              });
            }); 
            this.preloadService.stopLoading();
            this.goBack();
          }, error => {
              this.preloadService.addError(error)
          });
      }else{
        this.userService.create(user)
          .subscribe(res => {
            this.translate.get('user.user-created').subscribe((msg: string) => {
              this._snackBar.open(msg, "ok", {
                duration: 5000,
              });
            });
            this.preloadService.stopLoading();
            this.goBack();
          }, error => {
              this.preloadService.addError(error)
          });
      }
    }
  }

  goBack(){
    this.location.back();
  }

}
