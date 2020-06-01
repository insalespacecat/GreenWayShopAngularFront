import {RouterModule, Routes} from '@angular/router';
import {ProductGridComponent} from './components/product-grid/product-grid.component';
import {OrderConfirmedComponent} from './components/order-confirmed/order-confirmed.component';

const routes: Routes = [
  {
    path: '', component: ProductGridComponent,
  },
  {
    path: 'thankYou', component: OrderConfirmedComponent
  },
];

export const AppRoutes = RouterModule.forRoot(routes);
