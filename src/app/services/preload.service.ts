import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {

  loading: boolean;
  hasError: boolean;
  error: HttpErrorResponse;

  constructor() { }

  fireLoading(){
    this.loading=true;
  }

  stopLoading(){
    this.loading=false;
  }
  
  addError(error){
    this.hasError=true;
    this.error=error;
    this.stopLoading();
  }
  clearErrors(){
    this.hasError=false;
    this.error = null;

  }


}
