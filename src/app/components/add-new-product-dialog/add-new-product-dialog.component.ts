import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductInterface} from "../../interfaces/product-interface";
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {FileService} from "../../services/file.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-new-product-dialog',
  templateUrl: './add-new-product-dialog.component.html',
  styleUrls: ['./add-new-product-dialog.component.css']
})
export class AddNewProductDialogComponent implements OnInit {

  newProduct: ProductInterface = {id: null, price: null, name: null, description: null};
  formGroup: FormGroup = new FormGroup({
    nameFormControl: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    priceFormControl: new FormControl('', [Validators.required, Validators.min(0.01)]),
  });

  file: File;
  isAdded = false;

  constructor(public dialogRef: MatDialogRef<AddNewProductDialogComponent>, private productService: ProductService,
              private uploadService: FileService) { }


  selectFile(event) {
    this.file = event.target.files[0];
    this.upload();
  }

  upload() {
    this.uploadService.upload(this.file).subscribe(
      res => {
        this.isAdded = true;
      }
      );
    this.file = undefined;
  }

  close(postToServer: boolean){
    if(postToServer){
      this.productService.addProduct(this.newProduct).subscribe(res => {});
    }
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
