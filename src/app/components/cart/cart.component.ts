import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/model/cart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../core/model/producto';

@Component({
  selector: 'app-cart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements AfterViewChecked {


  ngAfterViewChecked(): void {
    this.changDetect.detectChanges(); 
  }
  
  


  public cartService = inject(CartService);
  public changDetect = inject(ChangeDetectorRef);
 
  alertVisible = false;

  ngOnInit(): void {
    this.getListCart();
  }
  
  listCart : Cart[] = [];

  getListCart(){
    this.listCart = this.cartService.getCarrito();
  }

  eliminarItem(index: number){
    this.cartService.eliminar(index);
    this.getListCart();
  }
  
  validarCantidad(item: any) {
    if (item.cantidad <= 0) {
      item.cantidad = 1;  // Si el valor es menor o igual a 0, se corrige a 1
    }
    this.changDetect.detectChanges();
  }

  onKeyDown(event: any){
    event.preventDefault();
  }

  update(item: Cart,index: number){
    this.cartService.actualizar(index,item.cantidad);
  }

  updateCantidad(item: Cart, index: number) {
    if (item.cantidad <= 0) {
      item.cantidad = 1;
    }
    this.update(item, index); // Actualiza el valor y luego realiza cualquier otra lógica
  }

  onCantidadChange(value: number, item: any) {
    if (value <= 0) {
      item.cantidad = 1;
    } else {
      item.cantidad = value;
    }
    this.changDetect.markForCheck();
  }
  

  mostrarAlerta() {
    this.alertVisible = true;
    this.procesar();
    this.getListCart();
    this.changDetect.detectChanges();
  }

  cerrarAlerta() {
    this.alertVisible = false;  // Ocultar el alert cuando se cierra
  }

  procesar(){
    this.cartService.borrarCarrito();
  }


}
