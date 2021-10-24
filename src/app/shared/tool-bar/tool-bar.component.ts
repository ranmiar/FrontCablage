import { Component, EventEmitter, OnInit, Output, Version, VERSION } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();
  selectedMenu: string = 'Cablage Tool';

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router, private sharedService: SharedService, private title: Title) { }

    ngOnInit(): void {

      this.title.setTitle('cablage tool 1.0.0.0');
    
    this.sharedService.itemtochange.subscribe((it)=>{
      this.selectedMenu = it;
      this.changeSelected(it);

    });
    
    }
  
    openAddContactDialog(): void {
     
    }
  
    openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
      return this.snackBar.open(message, action, {
        duration: 5000,
      });
    }

    changeSelected(sele: string){
      this.selectedMenu = sele;

    }

}
