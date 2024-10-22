import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private listCarrito: Cart[]=[];
  constructor() { }




  getCarrito(){
    this.obtenerSesion();
    return this.listCarrito;
  }


  agregar(prod: Producto, cant: number=1){
    this.obtenerSesion();
    const index= this.listCarrito.findIndex(item=>item.producto.id == prod.id);
    if(index == -1){
       const item = new Cart(prod,cant);
       this.listCarrito.push(item);
    }else{
      this.actualizar(index,this.listCarrito[index].cantidad + cant);
    }
    this.guardarSesion();
  }

actualizar(index: number, cantidad: number){
  if(index >= 0 && index < this.listCarrito.length){
    this.listCarrito[index].cantidad = cantidad;
  }
}

cantidad(){
  this.obtenerSesion();
  return this.listCarrito.length;
}

total(){
  const total = this.listCarrito.reduce((sum, item) => {
    return sum + item.producto.precio * item.cantidad;
  }, 0);
  
  return total;
}

eliminar(index: number){
  if(index >= 0 && index < this.listCarrito.length){
    this.listCarrito.splice(index, 1);
    this.guardarSesion();
  }
}


guardarSesion(){
  localStorage.setItem('cart', JSON.stringify(this.listCarrito));
}

obtenerSesion(){
  this.listCarrito = [];
  if(typeof window != 'undefined' && window.localStorage){
    const carrito = localStorage.getItem('cart');
    if(carrito != null){
      this.listCarrito = JSON.parse(carrito);
    }
  }
}

borrarCarrito(){
  this.listCarrito = [];
  this.guardarSesion();
}


}
