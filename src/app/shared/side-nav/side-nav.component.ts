import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  public isScreenSmall: boolean = false;
  isDarkTheme: boolean = false;
  dir: string = 'ltr';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router, private sharedService: SharedService) { }

    ngOnInit(): void {
      this.breakpointObserver
        .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
        .subscribe((state: BreakpointState) => {
          this.isScreenSmall = state.matches;
        });
  
  
  
      this.router.events.subscribe(() => {
        if (this.isScreenSmall) {
          this.sidenav.close();
        }
      });
    }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }
  clickclassification(){
  this.sharedService.itemtochange.next('Classification');
  this.router.navigate(['/classifications']);
  }

  clickprogram(){
    this.sharedService.itemtochange.next('Program');

  }

  clickcomponent(){
    this.sharedService.itemtochange.next('Component');
    this.router.navigate(['/components']);
  }
 

}
