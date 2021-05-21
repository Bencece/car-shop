import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  products: Product[] = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.post<Product[]>("http://localhost:3000/products", {responseType: 'text', withCredentials: true}).subscribe(data =>{
      this.products = data
    })
  }

}
