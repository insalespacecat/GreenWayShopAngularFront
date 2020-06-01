import {RouterModule, Routes} from '@angular/router';
import {ProductGridComponent} from './components/product-grid/product-grid.component';
import {OrderConfirmedComponent} from './components/order-confirmed/order-confirmed.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {AboutUsComponent} from "./components/about-us/about-us.component";

const routes: Routes = [
  {
    path: '', component: ProductGridComponent,
  },
  {
    path: 'thankYou', component: OrderConfirmedComponent
  },
  {
    path: 'me', component: MyAccountComponent
  },
  {
    path: 'about', component: AboutUsComponent
  }
];

export const AppRoutes = RouterModule.forRoot(routes);
