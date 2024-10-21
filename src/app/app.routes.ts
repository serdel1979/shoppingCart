import { Routes } from '@angular/router';
import { InicioComponent } from './components/catalog/inicio/inicio.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'carrito',component: CartComponent},
    {path: '**', pathMatch: 'full', redirectTo: ''}
];
