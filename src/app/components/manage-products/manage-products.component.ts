import { Component, OnInit } from '@angular/core';
import {ProductInterface} from "../../interfaces/product-interface";
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteProductConfirmationDialogComponent} from "../delete-product-confirmation-dialog/delete-product-confirmation-dialog.component";
import {AddNewProductDialogComponent} from "../add-new-product-dialog/add-new-product-dialog.component";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
  animations: [
    trigger('fade',
      [
        transition('* => void', [
          style({opacity: 0}),
          animate(150)
        ]),
        transition('void => *',[
          style({opacity: 0}),
          animate(150)
        ])
      ])
  ]
})
export class ManageProductsComponent implements OnInit {

  breakpoint;
  adaptiveRowHeight;
  productInfoList: Array<ProductInterface>;

  constructor(private productService: ProductService, private dialog: MatDialog) { }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
    this.adaptiveRowHeight = (window.innerWidth <= 400) ? '1:1' : '1:1.5';
    console.log(JSON.stringify(this.adaptiveRowHeight));
  }

  openNewProductDialog(){
    const dialogConfig = {
      width: '350px'
    };
    const orderDialogRef = this.dialog.open(AddNewProductDialogComponent, dialogConfig);
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;
    this.adaptiveRowHeight = (window.innerWidth <= 400) ? '1:1' : '1:1.5';
    this.productService.getProducts().subscribe(res => this.productInfoList = res);
  }
}
