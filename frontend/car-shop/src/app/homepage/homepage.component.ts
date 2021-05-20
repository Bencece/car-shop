import { Component, OnInit } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  products: Product[] =[
    { itemid: 1, name: "BMW", description: "Fekete autó", prize: 10000000, image: "assets/car1.jpg", quantity: 1},
    { itemid: 2, name: "BMW", description: "Zöld autó", prize: 18000000, image: "assets/car2.jpg", quantity: 1}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
