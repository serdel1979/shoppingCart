import { Producto } from "./producto";

export class Cart {
    producto: Producto;
    cantidad: number;


    constructor(producto: Producto, cantidad: number = 1){
        this.producto = producto;
        this.cantidad = cantidad;
    }



    
}
