import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Product } from 'src/products';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  minPrice: number | undefined;
  maxPrice: number | undefined;
  products: Product[] = [];

  constructor(private productService: ProduitService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  search() {
    if (this.minPrice && this.maxPrice) {
      this.productService.searchProductsByPrice(this.minPrice, this.maxPrice)
        .subscribe(
          response => {
            this.products = response;
          },
          error => {
            console.error('Error searching products:', error);
          }
        );
    }
  }
}
