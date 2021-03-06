import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { ClientsPage } from '../pages/clients/clients';
import { ClientCreatePage } from '../pages/client-create/client-create';
import { SalesPage } from '../pages/sales/sales';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    ClientsPage,
    ClientCreatePage,
    SalesPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ClientsPage,
    ClientCreatePage,
    SalesPage,
    HomePage,
    TabsPage
  ],
  providers: []
})
export class AppModule {}
