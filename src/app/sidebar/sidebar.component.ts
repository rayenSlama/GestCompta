import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../service/settings.service';
import { UserService } from '../service/user.service';
import { ROUTES } from './sidebar-routes.config';

declare const $ : any;



@Component({
selector: 'app-sidebar',
templateUrl: './sidebar.component.html',
styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  public color: string;
  public menuItems: object;
  public activeFontColor: string;
  public normalFontColor: string;
  public dividerBgColor: string;
  name = "";

constructor(private userService:UserService,private router:Router, public settingsService: SettingsService) {
  this.menuItems = ROUTES;
    this.activeFontColor = 'rgba(0,0,0,.6)';
    this.normalFontColor = 'rgba(255,255,255,.8)';
    this.dividerBgColor = 'rgba(255, 255, 255, 0.5)';
 }


logout(){
  localStorage.removeItem('name');
  this.userService.islogin = false;
  this.router.navigate(['/login'])
}
ngOnInit() {
  
  this.name = localStorage.getItem('name');

  this.color = this.settingsService.getSidebarFilter();
  this.settingsService.sidebarFilterUpdate.subscribe((filter: string) => {
    this.color = filter;
    if (filter === '#fff') {
      this.activeFontColor = 'rgba(0,0,0,.6)';
    }else {
      this.activeFontColor = 'rgba(255,255,255,.8)';
    }
  });
  this.settingsService.sidebarColorUpdate.subscribe((color: string) => {
    if (color === '#fff') {
      this.normalFontColor = 'rgba(0,0,0,.6)';
      this.dividerBgColor = 'rgba(0,0,0,.1)';
    }else {
      this.normalFontColor = 'rgba(255,255,255,.8)';
      this.dividerBgColor = 'rgba(255, 255, 255, 0.5)';
    }
  });
  
}

ngOnDestroy() {
  this.settingsService.sidebarFilterUpdate.unsubscribe();
  this.settingsService.sidebarColorUpdate.unsubscribe();
}

ngAfterViewInit() {
}


isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
};
}