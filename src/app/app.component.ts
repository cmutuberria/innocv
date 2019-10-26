import { Component, OnInit } from '@angular/core';
import { PreloadService } from './services/preload.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{

  constructor(public preloadService: PreloadService, translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
    if (localStorage.getItem('lang')) {
      translate.use(localStorage.getItem('lang'));
    } else {
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
      localStorage.setItem('lang', translate.currentLang);
    }
  }

  ngOnInit(){
    this.preloadService.stopLoading()
  }



}
