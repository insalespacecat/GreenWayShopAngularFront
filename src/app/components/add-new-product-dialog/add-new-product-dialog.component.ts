import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductInterface} from "../../interfaces/product-interface";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
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

  product: ProductInterface = {id: null, price: null, name: null, description: null};
  formGroup: FormGroup = new FormGroup({
    nameFormControl: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    priceFormControl: new FormControl('', [Validators.required, Validators.min(0.01)]),
  });

  file: File;
  isAdded = false;

  constructor(public dialogRef: MatDialogRef<AddNewProductDialogComponent>, private productService: ProductService,
              private uploadService: FileService, @Inject(MAT_DIALOG_DATA) public data: any) { }


  selectFile(event) {
    this.file = event.target.files[0];
    this.upload();
    this.dialogRef.close();
  }

  upload() {
    this.uploadService.upload(this.file, this.product.name).subscribe(
      res => {
        this.isAdded = true;
      }
      );
    this.file = undefined;
  }

  submitToServer(postToServer: boolean){
    if(postToServer){
      this.productService.addProduct(this.product).subscribe(res => {});
    }
  }

  ngOnInit(): void {
    if(this.data.info){
      this.product = Object.assign({}, this.data.info);
    }
  }

}
