import {Component, Input, OnInit} from '@angular/core';
import {ProductInterface} from "../../interfaces/product-interface";
import {OrderDialogComponent} from "../order-dialog/order-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteProductConfirmationDialogComponent} from "../delete-product-confirmation-dialog/delete-product-confirmation-dialog.component";
import {AddNewProductDialogComponent} from "../add-new-product-dialog/add-new-product-dialog.component";

@Component({
  selector: 'app-product-card-admin-edit',
  templateUrl: './product-card-admin-edit.component.html',
  styleUrls: ['./product-card-admin-edit.component.css']
})
export class ProductCardAdminEditComponent implements OnInit {

  @Input() productInfo: ProductInterface;
  constructor(private dialog: MatDialog) { }

  openProductDeleteConfirmationDialog(): void {
    const dialogConfig = {
        width: '250px',
        data: {productInfo: this.productInfo}
      };
      const orderDialogRef = this.dialog.open(DeleteProductConfirmationDialogComponent, dialogConfig);
    }

  openEditProductDialog(){
      const dialogConfig = {
        width: '350px',
        data: {info: this.productInfo}
      };
      const orderDialogRef = this.dialog.open(AddNewProductDialogComponent, dialogConfig);
  }
  ngOnInit(): void {
  }

}
