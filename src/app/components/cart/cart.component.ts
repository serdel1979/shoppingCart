import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/model/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  public cartService = inject(CartService);

  ngOnInit(): void {
    this.getListCart();
  }
  
  listCart : Cart[] = [];

  getListCart(){
    this.listCart = this.cartService.getCarrito();
  }




}
