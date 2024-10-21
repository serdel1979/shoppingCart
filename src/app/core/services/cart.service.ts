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
    return this.listCarrito;
  }


  agregar(prod: Producto, cant: number=1){
    const index= this.listCarrito.findIndex(item=>item.producto.id == prod.id);
    if(index == -1){
       const item = new Cart(prod,cant);
       this.listCarrito.push(item);
    }else{
      this.actualizar(index,this.listCarrito[index].cantidad + cant);
    }

  }

actualizar(index: number, cantidad: number){
  if(index >= 0 && this.listCarrito.length){
    this.listCarrito[index].cantidad = cantidad;
  }
}

cantidad(){
  return this.listCarrito.length;
}

total(){
  const total = this.listCarrito.reduce((sum,item)=>
    sum = item.producto.precio * item.cantidad, 0
  )
  return total;
}


}
