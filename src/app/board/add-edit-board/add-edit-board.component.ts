import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-add-edit-board',
  templateUrl: './add-edit-board.component.html',
  styleUrls: ['./add-edit-board.component.scss'],
})
export class AddEditBoardComponent implements OnInit {

  protected onDestroy = new Subject<void>();
  addEditBoard : FormGroup
  addEditBoardId:string
  addEditBoardEdit = {};
  dialog: any;
  getAllBoard: any;

  constructor(private boardService:BoardService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.addEditBoardId = params.get("id");
      }); 
      this.initializeForm();
      if (this.addEditBoardId != null) {
        this.boardService
          .getBoardById(this.addEditBoardId)
          .subscribe((response) => {
            this.addEditBoard = this.formBuilder.group({
              addEditBoardId: [response.resObject[0].board_id],
              boardName: [response.resObject[0].board_name , Validators.required],
              boardShortName: [response.resObject[0].board_short_name , Validators.required],
              boardDescription: [response.resObject[0].board_description ],
             });
          });
      }
  }
  initializeForm() {
    this.addEditBoard = this.formBuilder.group({
      boardName: ['',Validators.required],
      boardShortName: ['',Validators.required],
      boardDescription: [''],
     });
  }
//FOR SAVE && UPDATE BOARD
saveBoard() {
   
  if (!this.addEditBoard.valid) {
    return;
  }
//UPDATE BOARD
if(this.addEditBoardId != null){
  
  const dataToSend = {
    boardId: this.addEditBoard.get("addEditBoardId").value,
    boardName: this.addEditBoard.get("boardName").value,
    boardShortName: this.addEditBoard.get("boardShortName").value,
    boardDescription: this.addEditBoard.get("boardDescription").value,
    updatedBy: 1,
    createdBy: 1,  
  };
  this.boardService
  .updateBoard(dataToSend)
  .subscribe((response) => {
    this.snackbar.open("Board Updated", "Ok", {
    //  duration: environment.snackDuration,
    });
        
  });
}else{
  
  const dataToSend = {
    boardName: this.addEditBoard.get("boardName").value,
    boardShortName: this.addEditBoard.get("boardShortName").value,
    boardDescription: this.addEditBoard.get("boardDescription").value,
    updatedBy: 1,
    createdBy: 1,
    status: 1,
  };
  this.boardService
  .saveBoard(dataToSend)
  .subscribe((response) => {
    this.snackbar.open("Board Created", "Ok", {
     // duration: environment.snackDuration,
    });     
    // this.ngOnInit(); 
    // this.ngOnDestroy();
  });

}
this.router.navigate(['/board/boardDetails']);
}


}
