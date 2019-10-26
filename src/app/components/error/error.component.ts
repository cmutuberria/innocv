import { Component, OnInit, Input } from '@angular/core';
import { PreloadService } from 'src/app/services/preload.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnInit {
  @Input() status:string;
  @Input() statusText:string;

  constructor(private preloadService: PreloadService, private router: Router) { 
  }

  ngOnInit() {

  }
  goToHome(){
    this.preloadService.clearErrors()
    this.router.navigate(['/']);
  }


}
