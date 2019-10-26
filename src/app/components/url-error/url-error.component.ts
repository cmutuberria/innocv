import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-url-error',
  templateUrl: './url-error.component.html',
  styleUrls: ['./url-error.component.sass']
})
export class UrlErrorComponent {
  status: string = "URL"
  statusText: string= "URL NOT FOUND"

  constructor() { 
   
  }

}
