import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { AppMaterialModule } from '../app-material/app-material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AddEditBoardComponent } from './add-edit-board/add-edit-board.component';


@NgModule({
  declarations: [
    BoardComponent,
    AddEditBoardComponent,
    ConfirmDialogComponent, 
  ],

  imports: [
    CommonModule,
    BoardRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BoardRoutingModule,
    AppMaterialModule,
    DragDropModule
  ]
})
export class BoardModule { }
