import { Component, OnInit } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { 
    this.sum = 0
  }

  products: Product[] = []
  sum : number

  ngOnInit(): void {
    var cart = localStorage.getItem("cart");
    if(cart){
      JSON.parse(cart).forEach((product: Product)=>{
        this.products.push(product)
        this.sum+=product.prize
      })
    }
  }

}
