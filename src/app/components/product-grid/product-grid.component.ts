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
        transition('* => void', [
          style({opacity: 0}),
          animate(400)
        ]),
        transition('void => *',[
          style({opacity: 0}),
          animate(400)
        ])
      ])
  ]
})
export class ProductGridComponent implements OnInit, DoCheck {
  breakpoint;
  adaptiveRowHeight;
  productInfoList: Array<ProductInterface>;
  cartHidden = true;
  constructor(private productService: ProductService, private cartService: CartService) { }
  hideShowCart() {
    this.cartHidden = !this.cartHidden;
  }

  displayMobileCart() {
    return (window.innerWidth <= 400);
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
    this.adaptiveRowHeight = (window.innerWidth <= 400) ? '1:1' : '1:1.5';
    console.log(JSON.stringify(this.adaptiveRowHeight));
  }

  ngDoCheck(): void {
    if (this.cartService.firstProductAdded()) {
      console.log('First product added');
      this.cartHidden = false;
    }
  }
  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;
    this.adaptiveRowHeight = (window.innerWidth <= 400) ? '1:1' : '1:1.5';
    console.log(JSON.stringify(this.adaptiveRowHeight));
    this.productService.getProducts().subscribe(res => this.productInfoList = res);
    if (this.cartService.hasProducts()) {
      console.log('Cart has products');
      this.cartHidden = false;
    }
    JSON.stringify(this.productInfoList);
  }
}
