import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StoreModule} from './store/store.module';
import {StoreComponent} from './store/store.component';
import {CartDetailComponent} from './store/cartDetail.component';
import {CheckoutComponent} from './store/checkout.component';
import {RouterModule} from '@angular/router';
import {StoreFirstGuard} from './storeFirst.guard';

 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule,
    RouterModule.forRoot([
      { path: 'store', component: StoreComponent
      },
      { path: 'cart', component: CartDetailComponent
      },
      { path: 'checkout', component: CheckoutComponent
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
        // loadChildren: 'src/app/admin/admin.module#AdminModule',
        // canActivate: [StoreFirstGuard]
      },
      { path: '**', redirectTo: '/store'
      }
    ])
  ],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
