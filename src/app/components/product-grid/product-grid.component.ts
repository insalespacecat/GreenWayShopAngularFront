import {Component, DoCheck, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductInterface} from '../../interfaces/product-interface';
import {CartService} from '../../services/cart.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css'],
  animations: [
    trigger('fade',
      [
        state( 'shown', style({opacity: 1})),
        state( 'hidden', style({opacity: 0})),
        transition('shown => hidden', [
          animate(200)
        ]),
        transition('hidden => shown',
          animate(200))
      ])
  ]
})
export class ProductGridComponent implements OnInit, DoCheck {
  productInfoList: Array<ProductInterface>;
  cartHidden = true;
  constructor(private productService: ProductService, private cartService: CartService) { }
  hideShowCart() {
    this.cartHidden = !this.cartHidden;
  }
  ngDoCheck(): void {
    if (this.cartService.firstProductAdded()) {
      console.log('First product added');
      this.cartHidden = false;
    }
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => this.productInfoList = res);
    if (this.cartService.hasProducts()) {
      console.log('Cart has products');
      this.cartHidden = false;
    }
    JSON.stringify(this.productInfoList);
  }
}
