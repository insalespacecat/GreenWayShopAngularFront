import { Component, OnInit } from '@angular/core';
import {ProductInterface} from "../../interfaces/product-interface";
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteProductConfirmationDialogComponent} from "../delete-product-confirmation-dialog/delete-product-confirmation-dialog.component";
import {AddNewProductDialogComponent} from "../add-new-product-dialog/add-new-product-dialog.component";

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  productInfoList: Array<ProductInterface>;

  constructor(private productService: ProductService, private dialog: MatDialog) { }

  openNewProductDialog(){
    const dialogConfig = {
      width: '250px'
    };
    const orderDialogRef = this.dialog.open(AddNewProductDialogComponent, dialogConfig);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => this.productInfoList = res);
  }
}
