import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {ProductService} from "../../services/product.service";
import {ProductInterface} from "../../interfaces/product-interface";
import {FileService} from "../../services/file.service";

@Component({
  selector: 'app-delete-product-confirmation-dialog',
  templateUrl: './delete-product-confirmation-dialog.component.html',
  styleUrls: ['./delete-product-confirmation-dialog.component.css']
})
export class DeleteProductConfirmationDialogComponent implements OnInit {

  productInfo: ProductInterface = Object.assign({}, this.data.productInfo);

  constructor(public dialogRef: MatDialogRef<DeleteProductConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService,
              private fileService: FileService) { }

  close(answer) {
    if(answer == true){
      this.productService.deleteProduct(this.productInfo.id).subscribe(res => {});
      this.fileService.delete(this.productInfo.name).subscribe(res => {});
    }
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
