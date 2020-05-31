import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductInterface} from '../../interfaces/product-interface';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CartContentComponent} from "../cart-content/cart-content.component";

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
export class ProductGridComponent implements OnInit {
  productInfoList: Array<ProductInterface>;
  @ViewChild(CartContentComponent) cartContent: CartContentComponent;
  constructor(private productService: ProductService) { }

  triggerSyncInCartContent(){
    this.cartContent.refreshCartView();
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => this.productInfoList = res);
  }
}
