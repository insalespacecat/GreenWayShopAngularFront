import {Component, DoCheck, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductInterface} from '../../interfaces/product-interface';
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
export class ProductGridComponent implements OnInit {
  productInfoList: Array<ProductInterface>;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => this.productInfoList = res);

  }
}
