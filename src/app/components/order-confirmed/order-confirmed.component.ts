import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-order-confirmed',
  templateUrl: './order-confirmed.component.html',
  styleUrls: ['./order-confirmed.component.css']
})
export class OrderConfirmedComponent implements OnInit {
  order: any;
  constructor(private orderService: OrderService) {
    this.order = null;
  }
  ngOnInit(): void {
    this.orderService.getLastOrder().subscribe(res => this.order = res);
  }
}
