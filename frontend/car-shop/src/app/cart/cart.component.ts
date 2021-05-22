import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private router: Router) { 
    this.sum = 0
  }

  products: Product[] = []
  sum : number

  ngOnInit(): void {
    this.products = []
    this.sum = 0
    var cart = localStorage.getItem("cart");
    if(cart){
      JSON.parse(cart).forEach((product: Product)=>{
        this.products.push(product)
        this.sum+=product.prize
      })
    }
  }

  removeFromCart(product: Product){
    var cart = localStorage.getItem("cart");
    if(cart){
      var tmp = JSON.parse(cart)
      tmp.forEach((pr: Product, index: number)=>{
        if(product.itemid == pr.itemid){
          this.sum-=pr.prize
          tmp.splice(index, 1)
        }
      })
      localStorage.setItem("cart", JSON.stringify(tmp))
      this.ngOnInit()
    }
  }

}
