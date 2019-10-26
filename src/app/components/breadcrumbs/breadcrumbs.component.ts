import { Component, Input } from '@angular/core';
import { Crumbs } from 'src/app/models/crumbs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.sass']
})
export class BreadcrumbsComponent {
  @Input() list:Crumbs[]; 

  constructor(public translate: TranslateService) { }

  


}
