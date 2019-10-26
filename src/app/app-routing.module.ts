import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UrlErrorComponent } from './components/url-error/url-error.component';


const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UserComponent, pathMatch: 'full' },
  { path: 'user/form', component: UserFormComponent, pathMatch: 'full'},
  { path: 'user/form/:id', component: UserFormComponent, pathMatch: 'full' },
  { path: 'user/:id', component: UserDetailComponent, pathMatch: 'full'},
  { path: '**', component: UrlErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
