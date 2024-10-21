import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/model/producto';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{


  ngOnInit(): void {
    this.getProductos();
  }

  private productoService = inject(ProductoService);
  private cartService = inject(CartService);

  productos : Producto[] = [];

  getProductos(){
    this.productoService.getProductos().subscribe({
      next:(data)=>{
        this.productos = data;
        console.log(this.productos);
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }

  agregarAlCarrito(producto: Producto){
    this.cartService.agregar(producto)
  }


}
