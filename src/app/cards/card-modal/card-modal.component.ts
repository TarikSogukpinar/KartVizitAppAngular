import { Card } from 'src/app/models/card';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!: FormGroup;
  showSpinner: boolean = false;

  constructor(private dialogRef: MatDialogRef<CardModalComponent>,
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Card,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.cardForm = this.formBuilder.group({
      name: [this.data?.name || '', Validators.maxLength(50)],
      email: [this.data?.name || '', [Validators.email, Validators.maxLength(50)]],
      title: [this.data?.name || '', [Validators.required, Validators.maxLength(255)]],
      phone: [this.data?.name || '', [Validators.required]],
      address: [this.data?.name || '', Validators.maxLength(255)],
    });


  }

  addCard(): void {
    this.showSpinner = true;
    this.cardService.addCard(this.cardForm.value).subscribe(response => {
      //this.getSuccess(response || 'Kartvizit Güncellendi' )
      this.cardService.getCards();
      this.showSpinner = false;
      this.dialogRef.close();

    }, (err: any) => {
      this.getError(err.message || 'Kartvizit güncellenirken sorun oluştu!')
    });
  }
  updateCard(): void {
    this.cardService.updateCard(this.cardForm.value, this.data.id).subscribe(response => {
      this.getSuccess(response || 'Kartvizit Güncellendi')

    }, (err: any) => {
      this.snackBar.open(err.message || 'Bir hata oluştu', '')
    })
  }
  deleteCard(): void {
    this.cardService.deleteCard(this.data.id).subscribe((response: any) => {
      this.getSuccess(response || 'Kartvizit başarı ile silindi')

    }, (err: any) => {
      this.getError(err.message || 'Kartvizit silirken sorun oluştu!')
    })
  }

  getSuccess(message: string): void {
    this.snackbarService.createSnackBar('success', message, 999);
    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();

  }
  getError(message: string) {
    this.snackbarService.createSnackBar('error', message);
    this.showSpinner = false;
  }

}
