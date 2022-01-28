import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {BoardService} from './board.service';


let boardDetails: BoardDetails[] = [];

export interface BoardDetails {}

@Component({
    selector: 'app-module',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
  })
  export class BoardComponent implements OnInit, OnDestroy{

    protected onDestroy = new Subject<void>();

    displayedColumns: string[] =['sl.no','board_name','board_short_name','board_description','action'];
    dataSource: MatTableDataSource<BoardDetails>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
   constructor(private boardService: BoardService,
               private router: Router,
               private dialog: MatDialog,
              private snackBar: MatSnackBar,
    ){}

    ngOnInit() 
    { 
      this.getAllBoard();
      console.log(localStorage.getItem('userId'));
      console.log(localStorage.getItem('userName'));
      console.log(localStorage.getItem('userType'));
    }
    // For GET ALL BOARD
  getAllBoard() {
                   this.boardService.
                   getAllBoard().
                   subscribe((response: any) => 
            {
            boardDetails = response.resObject;
            console.log(boardDetails);
            this.dataSource = new MatTableDataSource(boardDetails);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            });
  }
// EDIT BOARD
editBoard(id) {
  // alert('Edit clicked')
  this.router.navigate(["/board/boardDetails/add", id]);
}
ngOnDestroy(): void {
  this.onDestroy.next();
  this.onDestroy.complete();
}

//DELETE BOARD
openDialog(id) {
    
  const dialogRef = this.dialog.open(ConfirmDialogComponent,{
    data:{
      message: 'Are you sure want to delete?',
      buttonText: {
        ok: 'Yes',
        cancel: 'Cancle'
      }
    }
  });
  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      this.boardService.deleteBoard(id).subscribe(() => {

     this.getAllBoard();

    });
    this.snackBar.open('Item deleted successfully', 'OK', {
        duration: 2000,
    });
    }
  });
}

// FOR FILTER
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}